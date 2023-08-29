import { Component, ElementRef, ViewChild } from '@angular/core';
import { OnInit } from '@angular/core';
import { GetProfileService } from './services/get-profile.service';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { AuthService } from './services/auth.service';
import { environment } from "../environments/environment";

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
  constructor(private getPfSv: GetProfileService, private authToken: AuthService) {}

  @ViewChild('cvInfo', { static: false }) el!: ElementRef;

  onChangeInputProfileLink() {}

  async buildCVPDF() {
    if (this.linkProfile && this.pageGetProfile) {
      if (this.pageGetProfile == 'linkedin') {
        this.isLoading = true;
        this.authToken.accessToken = environment.linkedin_token;
        this.getPfSv
        .getProfileLinkedIn(await this.linkProfile)
        .subscribe((res) => {
          if (res) {
            this.isLoading = false;
            alert('Build CV successfully');
            this.profileUser = res;
            this.profilePicUrl = this.profileUser.profile_pic_url;
            this.fullName = this.profileUser.full_name;
            this.studyAt = this.profileUser.occupation;
            this.city = this.profileUser.city;
            this.country = this.profileUser.country_full_name;
            for(let i = 0; i < this.profileUser.experiences.length; i++) {
              let experience = {
                company: this.profileUser.experiences[i].company,
                position: this.profileUser.experiences[i].title
              }
              this.experiences.push(experience);
            }
            for(let i = 0; i < this.profileUser.education.length; i++) {
              let education = {
                school: this.profileUser.education[i].school,
                fieldOfStudy: this.profileUser.education[i].field_of_study
              }
              this.educations.push(education);
            }
            for(let i = 0; i < this.profileUser.skills.length; i++) {
              let skill = {
                name: this.profileUser.skills[i]
              }
              this.skills.push(skill);
            }
          }
        }, (error) => {
          this.isLoading = false;
            alert("Error when getting data");
          }
        );
      } else if (this.pageGetProfile == 'orcid') {
        this.isLoading = true;
        var splitted = this.linkProfile.split('/');
        var IdORCID = splitted[splitted.length - 1];

        //test: https://orcid.org/0009-0007-1859-8716
        this.getPfSv.getProfileORCID(await IdORCID).subscribe(
          (res) => {
            console.log(res);
            // const employmentSummaries =
            //   res['activities-summary'].educations['affiliation-group'][0]
            //     .summaries[0]['education-summary'].organization.name;
            // console.log(employmentSummaries);

            if (res) {
              alert('Build CV successfully');
              this.profileUser = res;
              this.fullName =
                this.profileUser.person.name['family-name'].value +
                this.profileUser.person.name['given-names'].value;
              //   this.studyAt = this.profileUser.occupation;
              //   this.city = this.profileUser.city;
              this.country =
                this.profileUser.person.addresses.address[0].country.value;
              this.experiences =
                this.profileUser['activities-summary'].employments[
                  'affiliation-group'
                ][0].summaries[0]['employment-summary'].organization.name;
              this.educations =
                this.profileUser['activities-summary'].educations[
                  'affiliation-group'
                ][0].summaries[0]['education-summary'].organization.name;

              console.log(this.educations);
            }
          },
          (err) => {
            console.log('Error:', err);
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
}
