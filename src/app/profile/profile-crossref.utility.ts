export function extractProfileCrossrefData(profileUser: any) {

    let works = profileUser.message.subject;
    let title = profileUser.message.title;
    let abstract = profileUser.message.abstract;
    let fullName = profileUser.message.author[0].given +" "+profileUser.message.author[0].family;

    let member = profileUser.message.member;
    return {
      fullName, 
      member,
      works,
      title,
      abstract,
    };
  }
  