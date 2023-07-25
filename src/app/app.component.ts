import { Component, ElementRef, ViewChild } from '@angular/core';
import { OnInit } from '@angular/core';
import { GetProfileService } from './services/get-profile.service';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  //Decurator
  selector: 'app-root', //Đồng nghĩa với document.querySelector('approot'); Angular chỉ cho xài element tag thôi
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
//Từ "selector .... styleUrls": Metadata
export class AppComponent {
  pageGetProfile: any;
  profileUserLinkedIn: any;
  linkProfileLinkedin: any;
  profilePicUrl: any;
  fullName: any;
  studyAt: any;
  city: any;
  country: any;
  skills: any;
  experiences: any;
  educations: any;
  constructor(private getPfSv: GetProfileService) {}

  @ViewChild('cvInfo', { static: false }) el!: ElementRef;

  onChangeInputProfileLink() {}

  async buildCVPDF() {
    if (this.linkProfileLinkedin && this.pageGetProfile) {
      if (this.pageGetProfile == 'linkedin') {
        this.getPfSv
          .getProfileLinkedIn(await this.linkProfileLinkedin)
          .subscribe((res) => {
            if (res) {
              alert('Build CV successfully');
              this.profileUserLinkedIn = res;
              this.profilePicUrl = this.profileUserLinkedIn.profile_pic_url;
              this.fullName = this.profileUserLinkedIn.full_name;
              this.studyAt = this.profileUserLinkedIn.occupation;
              this.city = this.profileUserLinkedIn.city;
              this.country = this.profileUserLinkedIn.country_full_name;
              this.experiences = this.profileUserLinkedIn.experiences;
              this.educations = this.profileUserLinkedIn.education;
              this.skills = this.profileUserLinkedIn.skills;
            }
          });
      } else if (this.pageGetProfile == 'orcid') {
        var splitted = this.linkProfileLinkedin.split('/');
        var IdORCID = splitted[splitted.length - 1];

        this.getPfSv.getProfileORCID(await IdORCID).subscribe(
          (res) => {
            console.log(res.person.name);
            // if (res) {
            //   alert('Build CV successfully');
            //   this.profileUserLinkedIn = res;
            //   this.profilePicUrl = this.profileUserLinkedIn.profile_pic_url;
            //   this.fullName = this.profileUserLinkedIn.person.given.name;
            //   this.studyAt = this.profileUserLinkedIn.occupation;
            //   this.city = this.profileUserLinkedIn.city;
            //   this.country = this.profileUserLinkedIn.country_full_name;
            //   this.experiences = this.profileUserLinkedIn.experiences;
            //   this.educations = this.profileUserLinkedIn.education;
            //   this.skills = this.profileUserLinkedIn.skills;
            // }
          },
          (err) => {
            console.log('Error:', err);
          }
        );
      }
      // else {
      //     //Viết code ở đây
      // }

      //this.getPfSv.getProfileLinkedIn1(this.linkProfileLinkedin);
    } else {
      alert('Vui lòng nhập link profile');
    }
  }

  downloadCVPDF() {
    if (this.profileUserLinkedIn) {
      html2canvas(this.el.nativeElement).then((canvas) => {
        const contentDataUrl = canvas.toDataURL('image/png');
        let pdf = new jsPDF('p', 'mm', 'a4');
        var width = pdf.internal.pageSize.getWidth();
        var height = (canvas.height * width) / canvas.width;
        pdf.addImage(contentDataUrl, 'PNG', 0, 0, width, height);
        pdf.save('cv.pdf');
      });
    } else {
      alert('Không tim thấy dữ liệu');
    }
  }
}
