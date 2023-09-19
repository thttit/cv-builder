export function extractProfileORCIDData(profileUser: any) {
  let experiences = [];
  let educations = [];
  let works = [];
  let fundings = [];
  let professional = [];

  let fullName =
    profileUser.person.name['given-names'].value +
    ' ' +
    profileUser.person.name['family-name'].value;

  let country =
    profileUser.person.addresses.address[0] &&
    profileUser.person.addresses.address[0].country &&
    profileUser.person.addresses.address[0].country.value
      ? profileUser.person.addresses.address[0].country.value
      : '';

  let employments =
    profileUser['activities-summary'].employments['affiliation-group'];
  for (let i = 0; i < employments.length; i++) {
    let employment_summary = employments[i].summaries[0]['employment-summary'];
    let experience = {
      organization:
        employment_summary.organization && employment_summary.organization.name
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
      disambiguated_organization_identifier:
        employment_summary.organization &&
        employment_summary.organization['disambiguated-organization'] &&
        employment_summary.organization['disambiguated-organization'][
          'disambiguated-organization-identifier'
        ]
          ? employment_summary.organization['disambiguated-organization'][
              'disambiguated-organization-identifier'
            ]
          : '',
      disambiguation_source:
        employment_summary.organization &&
        employment_summary.organization['disambiguated-organization'] &&
        employment_summary.organization['disambiguated-organization'][
          'disambiguation-source'
        ]
          ? employment_summary.organization['disambiguated-organization'][
              'disambiguation-source'
            ]
          : '',
    };
    experiences.push(experience);
  }

  let edu = profileUser['activities-summary'].educations['affiliation-group'];
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
      disambiguated_organization_identifier:
        education_summary.organization &&
        education_summary.organization['disambiguated-organization'] &&
        education_summary.organization['disambiguated-organization'][
          'disambiguated-organization-identifier'
        ]
          ? education_summary.organization['disambiguated-organization'][
              'disambiguated-organization-identifier'
            ]
          : '',
      disambiguation_source:
        education_summary.organization &&
        education_summary.organization['disambiguated-organization'] &&
        education_summary.organization['disambiguated-organization'][
          'disambiguation-source'
        ]
          ? education_summary.organization['disambiguated-organization'][
              'disambiguation-source'
            ]
          : '',
    };
    educations.push(education);
  }

  let work = profileUser['activities-summary'].works.group;
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
    works.push(_work);
  }

  let fund = profileUser['activities-summary'].fundings.group;
  for (let i = 0; i < fund.length; i++) {
    let funding_summary = fund[i]['funding-summary'][0];
    let funding = {
      title:
        funding_summary.title &&
        funding_summary.title.title &&
        funding_summary.title.title.value
          ? funding_summary.title.title.value
          : '',
      start_year:
        funding_summary['start-date'] &&
        funding_summary['start-date'].year &&
        funding_summary['start-date'].year.value
          ? funding_summary['start-date'].year.value
          : '',
      start_month:
        funding_summary['start-date'] &&
        funding_summary['start-date'].month &&
        funding_summary['start-date'].month.value
          ? funding_summary['start-date'].month.value
          : '',
      start_day:
        funding_summary['start-date'] &&
        funding_summary['start-date'].day &&
        funding_summary['start-date'].day.value
          ? funding_summary['start-date'].day.value
          : '',
      end_year:
        funding_summary['end-date'] &&
        funding_summary['end-date'].year &&
        funding_summary['end-date'].year.value
          ? funding_summary['end-date'].year.value
          : '',
      end_month:
        funding_summary['end-date'] &&
        funding_summary['end-date'].month &&
        funding_summary['end-date'].month.value
          ? funding_summary['end-date'].month.value
          : '',
      end_day:
        funding_summary['end-date'] &&
        funding_summary['end-date'].day &&
        funding_summary['end-date'].day.value
          ? funding_summary['end-date'].day.value
          : '',
      type: funding_summary.type ? funding_summary.type : '',
      organization:
        funding_summary.organization && funding_summary.organization.name
          ? funding_summary.organization.name
          : '',
      city:
        funding_summary.organization &&
        funding_summary.organization.address &&
        funding_summary.organization.address.city
          ? funding_summary.organization.address.city
          : '',
      region:
        funding_summary.organization &&
        funding_summary.organization.address &&
        funding_summary.organization.address.region
          ? funding_summary.organization.address.region
          : '',
      country:
        funding_summary.organization &&
        funding_summary.organization.address &&
        funding_summary.organization.address.country
          ? funding_summary.organization.address.country
          : '',
      disambiguated_organization_identifier:
        funding_summary.organization &&
        funding_summary.organization['disambiguated-organization'] &&
        funding_summary.organization['disambiguated-organization'][
          'disambiguated-organization-identifier'
        ]
          ? funding_summary.organization['disambiguated-organization'][
              'disambiguated-organization-identifier'
            ]
          : '',
      disambiguation_source:
        funding_summary.organization &&
        funding_summary.organization['disambiguated-organization'] &&
        funding_summary.organization['disambiguated-organization'][
          'disambiguation-source'
        ]
          ? funding_summary.organization['disambiguated-organization'][
              'disambiguation-source'
            ]
          : '',
    };
    fundings.push(funding);
  }

  let pro = profileUser['activities-summary'].memberships['affiliation-group'];
  for (let i = 0; i < pro.length; i++) {
    let pro_summary = pro[i].summaries[0]['membership-summary'];
    let profession = {
      organization:
        pro_summary.organization && pro_summary.organization.name
          ? pro_summary.organization.name
          : '',
      city:
        pro_summary.organization &&
        pro_summary.organization.address &&
        pro_summary.organization.address.city
          ? pro_summary.organization.address.city
          : '',
      region:
        pro_summary.organization &&
        pro_summary.organization.address &&
        pro_summary.organization.address.region
          ? pro_summary.organization.address.region
          : '',
      country:
        pro_summary.organization &&
        pro_summary.organization.address &&
        pro_summary.organization.address.country
          ? pro_summary.organization.address.country
          : '',
      start_year:
        pro_summary['start-date'] &&
        pro_summary['start-date'].year &&
        pro_summary['start-date'].year.value
          ? pro_summary['start-date'].year.value
          : '',
      start_month:
        pro_summary['start-date'] &&
        pro_summary['start-date'].month &&
        pro_summary['start-date'].month.value
          ? pro_summary['start-date'].month.value
          : '',
      start_day:
        pro_summary['start-date'] &&
        pro_summary['start-date'].day &&
        pro_summary['start-date'].day.value
          ? pro_summary['start-date'].day.value
          : '',
      end_year:
        pro_summary['end-date'] &&
        pro_summary['end-date'].year &&
        pro_summary['end-date'].year.value
          ? pro_summary['end-date'].year.value
          : '',
      end_month:
        pro_summary['end-date'] &&
        pro_summary['end-date'].month &&
        pro_summary['end-date'].month.value
          ? pro_summary['end-date'].month.value
          : '',
      end_day:
        pro_summary['end-date'] &&
        pro_summary['end-date'].day &&
        pro_summary['end-date'].day.value
          ? pro_summary['end-date'].day.value
          : '',
      role_title: pro_summary['role-title'] ? pro_summary['role-title'] : '',
      disambiguated_organization_identifier:
        pro_summary.organization &&
        pro_summary.organization['disambiguated-organization'] &&
        pro_summary.organization['disambiguated-organization'][
          'disambiguated-organization-identifier'
        ]
          ? pro_summary.organization['disambiguated-organization'][
              'disambiguated-organization-identifier'
            ]
          : '',
      disambiguation_source:
        pro_summary.organization &&
        pro_summary.organization['disambiguated-organization'] &&
        pro_summary.organization['disambiguated-organization'][
          'disambiguation-source'
        ]
          ? pro_summary.organization['disambiguated-organization'][
              'disambiguation-source'
            ]
          : '',
    };
    professional.push(profession);
  }
  return {
    fullName,
    country,
    experiences,
    educations,
    works,
    fundings,
    professional,
  };
}
