import { Component, ElementRef, ViewChild } from '@angular/core';
import { OnInit } from '@angular/core';
import { GetProfileService } from './services/get-profile.service';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { AuthService } from './services/auth.service';
import { environment } from '../environments/environment';

@Component({
  //Decurator
  selector: 'app-root', //Đồng nghĩa với document.querySelector('approot'); Angular chỉ cho xài element tag thôi
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
//Từ "selector .... styleUrls": Metadata
export class AppComponent {
  isLoading: boolean = false;
  pageGetProfile: any;
  profileUser: any;
  linkProfile: any;
  profilePicUrl: any;
  fullName: any;
  studyAt: any;
  city: any;
  country: any;
  skills: any[] = [];
  experiences: any[] = [];
  educations: any[] = [];
  works: any[] = [];
  constructor(
    private getPfSv: GetProfileService,
    private authToken: AuthService
  ) {}

  @ViewChild('cvInfo', { static: false }) el!: ElementRef;

  onChangeInputProfileLink() {}

  async buildCVPDF() {
    if (this.linkProfile && this.pageGetProfile) {
      if (this.pageGetProfile == 'linkedin') {
        this.isLoading = true;
        this.authToken.accessToken = environment.linkedin_token;
        this.getPfSv.getProfileLinkedIn(await this.linkProfile).subscribe(
          (res) => {
            if (res) {
              this.isLoading = false;
              alert('Build CV successfully');
              this.profileUser = res;
              this.profilePicUrl = this.profileUser.profile_pic_url;
              this.fullName = this.profileUser.full_name;
              this.studyAt = this.profileUser.occupation;
              this.city = this.profileUser.city;
              this.country = this.profileUser.country_full_name;
              for (let i = 0; i < this.profileUser.experiences.length; i++) {
                let experience = {
                  company: this.profileUser.experiences[i].company,
                  position: this.profileUser.experiences[i].title,
                };
                this.experiences.push(experience);
              }
              for (let i = 0; i < this.profileUser.education.length; i++) {
                let education = {
                  school: this.profileUser.education[i].school,
                  fieldOfStudy: this.profileUser.education[i].field_of_study,
                };
                this.educations.push(education);
              }
              for (let i = 0; i < this.profileUser.skills.length; i++) {
                let skill = {
                  name: this.profileUser.skills[i],
                };
                this.skills.push(skill);
              }
            }
          },
          (error) => {
            this.isLoading = false;
            alert('Error when getting data');
          }
        );
      } else if (this.pageGetProfile == 'orcid') {
        this.isLoading = true;
        var splitted = this.linkProfile.split('/');
        var IdORCID = splitted[splitted.length - 1];

        //test: https://orcid.org/0000-0001-9819-9860
        this.getPfSv.getProfileORCID(await IdORCID).subscribe(
          (res) => {
            if (res) {
              alert('Build CV successfully');
              this.profileUser = res;
              this.profileORCID();
            }
          },
          (error) => {
            this.isLoading = false;
            alert('Error when getting data');
          }
        );
      }
      // else {
      //     //Viết code ở đây
      // }
    } else {
      alert('Vui lòng nhập link profile');
    }
  }

  downloadCVPDF() {
    if (this.profileUser) {
      html2canvas(this.el.nativeElement).then((canvas) => {
        const contentDataUrl = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();

        const imgWidth = pdfWidth;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        let position = 0;

        pdf.addImage(contentDataUrl, 'PNG', 0, position, imgWidth, imgHeight);

        position += imgHeight;

        // Check if remaining space is enough for another image
        if (position < pdfHeight) {
          pdf.addPage();
        }

        pdf.save('cv.pdf');
      });
    } else {
      alert('Không tìm thấy dữ liệu');
    }
  }

  profileORCID() {
    this.fullName =
      this.profileUser.person.name['family-name'].value +
      this.profileUser.person.name['given-names'].value;
    this.country = this.profileUser.person.addresses.address[0].country.value;

    let employments =
      this.profileUser['activities-summary'].employments['affiliation-group'];

    for (let i = 0; i < employments.length; i++) {
      let employment_summary =
        employments[i].summaries[0]['employment-summary'];
      let experience = {
        organization:
          employment_summary.organization &&
          employment_summary.organization.name
            ? employment_summary.organization.name
            : '',
        city:
          employment_summary.organization &&
          employment_summary.organization.address &&
          employment_summary.organization.address.city
            ? employment_summary.organization.address.city
            : '',
        region:
          employment_summary.organization &&
          employment_summary.organization.address &&
          employment_summary.organization.address.region
            ? employment_summary.organization.address.region
            : '',
        country:
          employment_summary.organization &&
          employment_summary.organization.address &&
          employment_summary.organization.address.country
            ? employment_summary.organization.address.country
            : '',
        start_year:
          employment_summary['start-date'] &&
          employment_summary['start-date'].year &&
          employment_summary['start-date'].year.value
            ? employment_summary['start-date'].year.value
            : '',
        start_month:
          employment_summary['start-date'] &&
          employment_summary['start-date'].month &&
          employment_summary['start-date'].month.value
            ? employment_summary['start-date'].month.value
            : '',
        start_day:
          employment_summary['start-date'] &&
          employment_summary['start-date'].day &&
          employment_summary['start-date'].day.value
            ? employment_summary['start-date'].day.value
            : '',
        end_year:
          employment_summary['end-date'] &&
          employment_summary['end-date'].year &&
          employment_summary['end-date'].year.value
            ? employment_summary['end-date'].year.value
            : '',
        end_month:
          employment_summary['end-date'] &&
          employment_summary['end-date'].month &&
          employment_summary['end-date'].month.value
            ? employment_summary['end-date'].month.value
            : '',
        end_day:
          employment_summary['end-date'] &&
          employment_summary['end-date'].day &&
          employment_summary['end-date'].day.value
            ? employment_summary['end-date'].day.value
            : '',
        role_title: employment_summary['role-title']
          ? employment_summary['role-title']
          : '',
        department_name: employment_summary['department-name']
          ? employment_summary['department-name']
          : '',
      };
      this.experiences.push(experience);
    }

    let edu =
      this.profileUser['activities-summary'].educations['affiliation-group'];
    for (let i = 0; i < edu.length; i++) {
      let education_summary = edu[i].summaries[0]['education-summary'];
      let education = {
        organization:
          education_summary.organization && education_summary.organization.name
            ? education_summary.organization.name
            : '',
        city:
          education_summary.organization &&
          education_summary.organization.address &&
          education_summary.organization.address.city
            ? education_summary.organization.address.city
            : '',
        region:
          education_summary.organization &&
          education_summary.organization.address &&
          education_summary.organization.address.region
            ? education_summary.organization.address.region
            : '',
        country:
          education_summary.organization &&
          education_summary.organization.address &&
          education_summary.organization.address.country
            ? education_summary.organization.address.country
            : '',
        start_year:
          education_summary['start-date'] &&
          education_summary['start-date'].year &&
          education_summary['start-date'].year.value
            ? education_summary['start-date'].year.value
            : '',
        start_month:
          education_summary['start-date'] &&
          education_summary['start-date'].month &&
          education_summary['start-date'].month.value
            ? education_summary['start-date'].month.value
            : '',
        start_day:
          education_summary['start-date'] &&
          education_summary['start-date'].day &&
          education_summary['start-date'].day.value
            ? education_summary['start-date'].day.value
            : '',
        end_year:
          education_summary['end-date'] &&
          education_summary['end-date'].year &&
          education_summary['end-date'].year.value
            ? education_summary['end-date'].year.value
            : '',
        end_month:
          education_summary['end-date'] &&
          education_summary['end-date'].month &&
          education_summary['end-date'].month.value
            ? education_summary['end-date'].month.value
            : '',
        end_day:
          education_summary['end-date'] &&
          education_summary['end-date'].day &&
          education_summary['end-date'].day.value
            ? education_summary['end-date'].day.value
            : '',
        role_title: education_summary['role-title']
          ? education_summary['role-title']
          : '',
        department_name: education_summary['department-name']
          ? education_summary['department-name']
          : '',
      };
      this.educations.push(education);
    }

    let work = this.profileUser['activities-summary'].works.group;
    for (let i = 0; i < work.length; i++) {
      let work_summary = work[i]['work-summary'][0];
      let _work = {
        title:
          work_summary.title &&
          work_summary.title.title &&
          work_summary.title.title.value
            ? work_summary.title.title.value
            : '',
        journal_title:
          work_summary['journal-title'] && work_summary['journal-title'].value
            ? work_summary['journal-title'].value
            : '',
        publication_year:
          work_summary['publication-date'] &&
          work_summary['publication-date'].year &&
          work_summary['publication-date'].year.value
            ? work_summary['publication-date'].year.value
            : '',
        publication_month:
          work_summary['publication-date'] &&
          work_summary['publication-date'].month &&
          work_summary['publication-date'].month.value
            ? work_summary['publication-date'].month.value
            : '',
        publication_day:
          work_summary['publication-date'] &&
          work_summary['publication-date'].day &&
          work_summary['publication-date'].day.value
            ? work_summary['publication-date'].day.value
            : '',
        type: work_summary.type ? work_summary.type : '',
        url:
          work_summary.url && work_summary.url.value
            ? work_summary.url.value
            : '',
      };
      this.works.push(_work);
    }
  }
}
