export interface DataItem {
  title: string;
  slug: string;
}

interface DataCategory {
  head: string;
  datas: DataItem[];
}
  
  export const data: DataCategory[] = [
    {
      head: "Category",
      datas: [
        { title: "Portfolio", slug: "portfolio" },
        { title: "E-Commerce", slug: "e-commerce" },
        { title: "Freelancing", slug: "freelancing" },
        { title: "Social Media", slug: "social-media" },
        { title: "SaaS", slug: "saas" },
        { title: "Blog/News", slug: "blog-news" },
        { title: "Educational", slug: "educational" },
        { title: "Non-Profit", slug: "non-profit" },
        { title: "Entertainment", slug: "entertainment" },
        { title: "Forum/Community", slug: "forum-community" },
        { title: "Landing Page", slug: "landing-page" },
        { title: "Real Estate", slug: "real-estate" },
        { title: "Travel and Tourism", slug: "travel-and-tourism" },
        { title: "Healthcare", slug: "healthcare" },
        { title: "Government", slug: "government" },
        { title: "Directory/Listing", slug: "directory-listing" },
        { title: "Event Management", slug: "event-management" },
        { title: "Membership Sites", slug: "membership-sites" },
        { title: "Job Board", slug: "job-board" },
      ],
    },
    {
      head: "Technologies",
      datas: [
        { title: "React", slug: "react" },
        { title: "Vue", slug: "vue" },
        { title: "Angular", slug: "angular" },
        { title: "Node", slug: "node" },
        { title: "Express", slug: "express" },
        { title: "Django", slug: "django" },
        { title: "Flask", slug: "flask" },
        { title: "Laravel", slug: "laravel" },
        { title: "Spring", slug: "spring" },
        { title: "ASP.NET", slug: "asp-net" },
        { title: "Ruby on Rails", slug: "ruby-on-rails" },
        { title: "Meteor", slug: "meteor" },
        { title: "Next.js", slug: "next-js" },
        { title: "Nuxt.js", slug: "nuxt-js" },
        { title: "Gatsby", slug: "gatsby" },
        { title: "Svelte", slug: "svelte" },
        { title: "Backbone", slug: "backbone" },
        { title: "Aurelia", slug: "aurelia" },
        { title: "jQuery", slug: "jquery" },
        { title: "JavaScript", slug: "javascript" },
        { title: "TypeScript", slug: "typescript" },
        { title: "Python", slug: "python" },
        { title: "HTML", slug: "html" },
        { title: "CSS", slug: "css" },
      ],
    },
  ];
  