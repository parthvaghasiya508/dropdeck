db.createUser(
  {
    user: 'dropdeck',
    pwd: 'L3brisDEK3r0u@C**',
    roles: [{
      role: 'readWrite',
      db: 'dropdeck'
    }]
  }
);

// Load the new dropdeck database
dropdeck = db.getSiblingDB('dropdeck');

dropdeck.createCollection("branding");
dropdeck.createCollection("companies");

// Insert Dropdeck company + branding
dropdeckId = ObjectId();
dropdeck.branding.insert({ _id: dropdeckId, domain: "dropdeck.com",
  logo: {
    image: "/dropdeck-logo-transparent.png",
    validated: true
  },
  colors: {
    accent: "#F21038",
    dark: "#1A1A1A",
    light: "#ccc"
  },
  fonts: {
    title: "Inter var",
    text: "Inter var"
  }
});
dropdeck.companies.insert({ domain: "dropdeck.com", name: "Dropdeck", description: "Perfect slides quickly? How fast can you type?", allowed: true, active: false, augmented: true, branding: dropdeckId });

// Initial settings
dropdeck.createCollection("settings");
dropdeck.settings.insert({ key: 'allowedOrganizations', values: ['^dropdeck.com$'] });
dropdeck.settings.insert({ key: 'allowedUsers', values: ['^bjarki.holm@gmail.com$','^mr.olafsson@gmail.com$','^theobonhamcarter@gmail.com$'] });

print('== Finished setting up initital data');
