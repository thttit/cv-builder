export function extractProfileIEEEData(profileUser: any) {

  let fullName = profileUser.name;
  let work = 'Author';
  let img = profileUser.img;
  let affiliation = profileUser.affiliation;
  let public_topic = profileUser.public_topic;
  let bio = profileUser.bio;

  return {
    fullName,
    work,
    img,
    affiliation,
    public_topic,
    bio
  };
}
