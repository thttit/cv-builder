import { Component, ElementRef, ViewChild } from '@angular/core';
import { OnInit } from '@angular/core';
import { GetProfileService } from './services/get-profile.service';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { AuthService } from './services/auth.service';
import { environment } from '../environments/environment';
import { extractProfileORCIDData } from './profile/profile-orcid.utility';
import { extractProfileCrossrefData } from './profile/profile-crossref.utility';
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
  title: any;
  country: any;
  abstract: any;
  other: any;
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
      }

      // Crossref Link test: 
      // https://doi.org/10.11646/zootaxa.5164.1.1
      // https://doi.org/10.54957/jolas.v2i2.182
      // https://doi.org/10.33545/26175754.2021.v4.i2a.110
      // https://doi.org/10.1364/JOSAB.1.000354

      else if (this.pageGetProfile == 'crossref') {


        this.isLoading = true;
        var splitted = this.linkProfile.split('/');
        var DOIcrossref = splitted[splitted.length - 2] + "/" + splitted[splitted.length - 1];
        this.getPfSv.getProfileCrossref(await DOIcrossref).subscribe(
          async (res) => {
            if (res) {
              this.isLoading = false;
              alert('Build CV successfully');
              this.profileUser = res;
              const profileData = extractProfileCrossrefData(this.profileUser);
              this.fullName = profileData.fullName;
              var memberID = profileData.member;
              this.country = this.getPfSv.getLocationCrossref(await memberID).subscribe(
                (resp) => {
                  if (resp) {
                    this.country = resp.message.location;
                  }
                });
              this.works = profileData.works;
              this.title = profileData.title;
              this.abstract = profileData.abstract;
              
              // Thay đổi giao diện cho phù hợp
              const myElement = document.getElementById("naruto");
              if (myElement) {
              myElement.innerHTML = `
              <style>
              .right-item{
                  color: black;
                  font-size: 40px;
                  text-align: left;
                  margin: 8px 0;
              }
              
              .content{
                color: black;
                text-align: left;
                margin: 3px 0;
              }
              </style>
              <div class="right-item">Subject</div>
                <p class="content">${this.works}</p>
              <hr>

              <div class="right-item">Research</div>
                <p class="content">${this.title}</p>
              <hr>

              <div class="right-item">Summary</div>
                <p class="content">${this.abstract}</p>
              <hr>
              `;
                  // Lấy nội dung HTML từ phần tử
                  const content = myElement.innerHTML;
                  
                  console.log(content);
              } else {
                  console.log("Không tìm thấy phần tử với ID 'myElement'");
              }
            }
          },
          (error) => {
            this.isLoading = false;
            alert('Error when getting data');
          }
        )
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
