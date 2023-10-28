import { Component, ElementRef, ViewChild } from '@angular/core';
import { OnInit } from '@angular/core';
import { GetProfileService } from './services/get-profile.service';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { AuthService } from './services/auth.service';
import { environment } from '../environments/environment';
import { extractProfileORCIDData } from './profile/profile-orcid.utility';
import { map } from 'rxjs';
import { GgSholarService } from './services/ggSholarService';

@Component({
  //Decurator
  selector: 'app-root', //Đồng nghĩa với document.querySelector('approot'); Angular chỉ cho xài element tag thôi
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
//Từ "selector .... styleUrls": Metadata
export class AppComponent {
  isIEEE: boolean = false
  isGgSholar: boolean = false
  isORCID: boolean = false
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
  fundings: any[] = [];
  professional: any[] = [];
  constructor(
    private getPfSv: GetProfileService,
    private authToken: AuthService,
    private ggSholarService: GgSholarService
  ) { }

  @ViewChild('cvInfo', { static: false }) el!: ElementRef;

  onChangeInputProfileLink() { }

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
        this.isORCID = true;
        this.isLoading = true;
        var splitted = this.linkProfile.split('/');
        var IdORCID = splitted[splitted.length - 1];

        //test: https://orcid.org/0000-0001-6402-2944
        //  https://orcid.org/0000-0002-5272-3302
        //  https://orcid.org/0000-0002-2068-605X
        // https://orcid.org/0000-0003-2952-6703
        // https://orcid.org/0000-0003-3188-3224
        this.getPfSv.getProfileORCID(IdORCID).subscribe(
          (res) => {
            if (res) {
              this.isLoading = false;
              alert('Build CV successfully');
              this.profileUser = res;
              const profileData = extractProfileORCIDData(this.profileUser);
              this.fullName = profileData.fullName;
              this.country = profileData.country;
              this.experiences = profileData.experiences;
              this.educations = profileData.educations;
              this.works = profileData.works;
              this.fundings = profileData.fundings;
              this.professional = profileData.professional;
            }
          },
          (error) => {
            this.isLoading = false;
            alert('Error when getting data');
          }
        );
      } else if (this.pageGetProfile === 'ggscholar') {
        this.isGgSholar = true
        this.isLoading = true;
        this.ggSholarService.getGgscholar(this.linkProfile).subscribe(
          (result: any) => {
            if (result) {
              this.profileUser = result
              this.isLoading = false;
              alert('Build CV successfully');
              this.fullName = result.author.name
              this.profilePicUrl = result.author.thumbnail
              this.ggSholarService.emitButtonClick(result);
            }
          }
        )
      } else if (this.pageGetProfile === 'ieee') {
        this.isIEEE = true
        this.isLoading = true
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
        const pdf = new jsPDF('p', 'mm', 'a4');
        const pageHeight = pdf.internal.pageSize.getHeight();
        const imgWidth = pdf.internal.pageSize.getWidth();
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        let heightLeft = imgHeight;
        const contentDataURL = canvas.toDataURL('image/png');
        let position = 0;

        // Thêm trang mới khi nội dung quá dài
        while (heightLeft > 0) {
          pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
          heightLeft -= pageHeight;
          position -= 295;

          // Nếu còn nội dung, thêm một trang mới
          if (heightLeft > 0) {
            pdf.addPage();
          }
        }

        pdf.save('cv.pdf');
      });
    } else {
      alert('Không tìm thấy dữ liệu');
    }
  }
  changeSelect(e: any) {
    this.linkProfile = ''
    switch (e) {
      case "ggscholar":
        this.isGgSholar = true
        break;
      default:
        this.resetData()
    }
  }
  resetData() {
    this.isGgSholar = false
    this.fullName = ''
    this.profilePicUrl = null
  }
}
