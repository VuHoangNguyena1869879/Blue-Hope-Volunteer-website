# Blue Hope Volunteer Website

**Blue Hope** is a full-stack volunteer management platform built for NGOs and community organizations to manage campaigns, volunteers, and social engagement. Developed as a part of the Web Development and Cloud course at the University of Adelaide, it integrates modern authentication, database interaction, and responsive UI.

![image](https://github.com/user-attachments/assets/dfb8e05f-ffce-4d1a-95a7-cf88baea7b77)

## Features

- **OAuth Login with Google and Facebook**
- **Volunteer Registration and Profile Management**
- **Event Management and Campaign Listings**
- **Contact and Feedback Submission**
- **Admin Dashboard for Role Management and User Monitoring**
- Secure session management using Passport.js and Express-session
- Responsive design with dynamic routing

## Tech Stack

| Layer        | Technology                            |
|--------------|----------------------------------------|
| Frontend     | HTML, CSS, JavaScript, EJS             |
| Backend      | Node.js, Express.js                    |
| Authentication | Passport.js (Google & Facebook OAuth) |
| Database     | MySQL                                  |
| Deployment   | Localhost (Dev), ready for cloud       |

## Setup Instructions

1. **Clone the Repository**
   ```bash
   git clone https://github.com/VuHoangNguyena1869879/Blue-Hope-Volunteer-website.git
   cd Blue-Hope-Volunteer-website
2. **Install Dependencies**
npm install
3. **Create a .env File**
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
FACEBOOK_CLIENT_ID=your_facebook_client_id
FACEBOOK_CLIENT_SECRET=your_facebook_client_secret
4. **Run the App**
npm start
Open your browser and go to: http://localhost:8080

## Folder Structure

```bash
├── app.js                # Entry point with express, routes, auth
├── bin/                  # Server runner
├── routes/               # Route handlers (users, index)
├── public/               # Static files (CSS, images)
├── views/                # EJS templates
├── .env                  # Environment variables (excluded via .gitignore)
└── package.json          # Project metadata and dependencies
```

## Project Context
This project was created for 24S1 Web Development and Cloud (WDC) as part of the third-year Computer Science curriculum at The University of Adelaide. It demonstrates key concepts including:
- Secure OAuth API integration
- Server-side rendering with EJS
- Modular route management in Express
- RESTful architecture principles

## Future Improvements
- Add MongoDB / Sequelize ORM for scalable data handling
- Deploy to Render / Railway / Vercel
- Integrate email notifications
- Mobile-first UI redesign
- License
This project is for academic and educational purposes only.

## Acknowledgements
Thanks to: The University of Adelaide, Quoc Khanh Duong, Thai Duy Anh Huynh, Duc Anh Duy Do

🔗 Contact
- Contact: nguyenvuhoang24022004@gmail.com
