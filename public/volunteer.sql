DROP SCHEMA IF EXISTS volunteer;

CREATE SCHEMA volunteer;

USE volunteer;

CREATE TABLE IF NOT EXISTS users (
    user_id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    phone VARCHAR(11) NOT NULL DEFAULT '0000000000',
    city VARCHAR(255) NOT NULL DEFAULT 'Adelaide',
    user_name VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS subscribers (
    subscriber_id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    family_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    city VARCHAR(100),
    subscribed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE branches (
    branch_id SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT,
    branch_name TINYTEXT NOT NULL,
    manager_id SMALLINT UNSIGNED NOT NULL DEFAULT 0,
    PRIMARY KEY (branch_id)
);

CREATE TABLE events (
    event_id SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT,
    event_name VARCHAR(255) NOT NULL,
    event_description TEXT NOT NULL,
    event_activities TEXT NOT NULL,
    event_prerequisite TEXT NOT NULL,
    event_date VARCHAR(255) NOT NULL,
    event_time VARCHAR(255) NOT NULL,
    event_location VARCHAR(255) NOT NULL,
    branch_id SMALLINT UNSIGNED NOT NULL,
    event_im_path VARCHAR(255) NOT NULL,
    event_type VARCHAR(255) NOT NULL,
    event_done BOOL NOT NULL,
    posted_on TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (event_id),
    FOREIGN KEY (branch_id) REFERENCES branches(branch_id) ON DELETE CASCADE
);

CREATE TABLE news (
    news_id SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT,
    news_title VARCHAR(255) NOT NULL,
    news_body TEXT NOT NULL,
    news_im_path VARCHAR(255) NOT NULL,
    posted_on TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    branch_id SMALLINT UNSIGNED NOT NULL,
    is_private BOOL NOT NULL,
    PRIMARY KEY (news_id),
    FOREIGN KEY (branch_id) REFERENCES branches(branch_id) ON DELETE CASCADE
);

CREATE TABLE rsvp (
    rsvp_id SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT,
    event_id SMALLINT UNSIGNED NOT NULL,
    user_id INT UNSIGNED NOT NULL,
    PRIMARY KEY (rsvp_id),
    FOREIGN KEY (event_id) REFERENCES events(event_id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

CREATE TABLE address (
    user_id SMALLINT UNSIGNED NOT NULL,
    street_no SMALLINT UNSIGNED NOT NULL,
    street_name VARCHAR(45) NOT NULL,
    city VARCHAR(45) NOT NULL,
    state_ VARCHAR(45) NOT NULL,
    postcode SMALLINT UNSIGNED NOT NULL,
    country VARCHAR(45) NOT NULL,
    PRIMARY KEY (user_id)
);

INSERT INTO
    branches(branch_name, manager_id)
VALUES
    ("Adelaide", 0),
    ("Melbourne", 0),
    ("Sydney", 0);

INSERT INTO
    users (
        full_name,
        email,
        phone,
        user_name,
        password,
        role
    )
VALUES
    (
        'Hoang',
        'a1123212@gmail.com',
        '0000000000',
        'admin',
        '$argon2id$v=19$m=65536,t=3,p=4$D/sa2amyLYoYnQIgtwzCPA$r74vM7zt3BVE80dHPb2Lsc6i7WsbbFpPSUmI5Q+pBQk',
        'admin'
    ),
    (
        'Duc Anh Duy Do',
        'a1881078@adelaide.edu.au',
        '0400000000',
        'admin123',
        '$argon2id$v=19$m=65536,t=3,p=4$fYCfYwPvtCQnyFwgt6ZD0A$2G+0Bix8agncUFSi4BqP7AkiaVxU6fWay06x8yqkc1E',
        'admin'
    );

-- Insert data into the events table
INSERT INTO
    events (
        event_name,
        event_description,
        event_activities,
        event_prerequisite,
        event_date,
        event_time,
        event_location,
        branch_id,
        event_type,
        event_done,
        event_im_path
    )
VALUES
    (
        'Garage Sale Event',
        'The Garage Sale Event is a community-driven initiative aimed at decluttering homes while raising funds for charitable causes. It''s an opportunity for individuals and families to sell gently used items they no longer need and for bargain hunters to find unique treasures at affordable prices. From clothing and accessories to household items, books, toys, and electronics, there''s something for everyone at the garage sale. Proceeds from the sales go towards supporting the mission and programs of the Blue Hope Volunteer Organization.',
        '🏠 Seller Registration: Individuals interested in participating as sellers can register online or at designated registration points. Sellers are encouraged to price and tag their items in advance. 🛍️ Shopping: Bargain hunters and community members are invited to shop at the garage sale for a wide variety of items at discounted prices. Cash transactions are preferred, but some sellers may accept electronic payments. 📦 Item Donation Drop-off: Donations of gently used items for the garage sale are accepted in the weeks leading up to the event. Donors can drop off their items at specified collection points or arrange for pick-up services. 🧹 Community Cleanup: In addition to the sale, the event promotes community cleanup efforts by encouraging participants to responsibly dispose of unsold items and recycle whenever possible. 🍔 Refreshments: Enjoy snacks and refreshments available for purchase at the event, with proceeds supporting the organization''s fundraising efforts. 🎉 Raffle Prizes: Enter to win exciting raffle prizes donated by local businesses and sponsors, with all proceeds going towards the charitable cause.',
        'No specific prerequisites required. If you''re interested in volunteering for this heartwarming event, please sign up on our website or contact us for more information. Donations of new toys, clothes, and non-perishable food items are also welcome to help make this event a success.',
        '8th May to 15th May (exclude weekends)',
        '10am - 3pm',
        'Ingkarni Wardli Atrium - University of Adelaide',
        1,
        -- Adelaide
        'Donation Volunteering',
        0,
        'images/garageSale1.jpg'
    ),
    (
        'Melbourne Food Festival',
        'Experience the culinary delights of Melbourne at the annual Melbourne Food Festival. This event brings together top chefs, food trucks, and local farmers to offer a wide variety of delicious foods and beverages. Enjoy cooking demonstrations, taste samples, and join in fun food-related activities.',
        '🍲 Food Tasting: Sample dishes from various food stalls.
        👨‍🍳 Cooking Demos: Watch live cooking demonstrations by renowned chefs.
        🛒 Farmers Market: Purchase fresh produce and gourmet products.
        🎉 Food Games: Participate in food-themed games and contests.',
        'No specific prerequisites required. Open to all food lovers.',
        'Saturday, September 20th, 2024',
        '11:00 AM - 8:00 PM',
        'Queen Victoria Market, Melbourne',
        2,
        -- Melbourne
        'Community Event',
        0,
        'images/food_festival.jpg'
    ),
    (
        'Santa Giveaway Event',
        'Experience the magic of giving this holiday season at our Santa Giveaway for Orphans event! As Santa''s helpers, we spread joy and love by delivering special gifts, including clothes and food, to orphanages in our community. But it''s not just about presents; it''s about creating cherished memories and bringing smiles to the faces of children who deserve extra love. Join us in making this holiday season unforgettable for these wonderful children!',
        'Gift Distribution: Volunteers will assist in sorting and distributing gifts to children based on age and gender. Interactive Games: Engage with the children through fun activities such as face painting, storytelling, and arts and crafts. Santa''s Grotto: Create a festive atmosphere with a Santa''s Grotto where children can meet Santa Claus and take photos. Food and Refreshments: Provide snacks and refreshments for volunteers and participants to enjoy during the event. Music and Entertainment: Keep the atmosphere lively with festive music and entertainment for all attendees.',
        'No specific prerequisites required. If you''re interested in volunteering for this heartwarming event, please sign up on our website or contact us for more information. Donations of new toys, clothes, and non-perishable food items are also welcome to help make this event a success.',
        'Saturday, December 21st, 2024',
        '10:00 AM - 2:00 PM',
        'SOS Orphanage 123 Main Street Adelaide, SA 5000',
        1,
        -- Adelaide
        'Donation Volunteering',
        1,
        'images/santa1.jpg'
    ),
    (
        'Sydney Food Festival',
        'Join the Sydney Food Festival to taste a variety of cuisines from around the world. The event features cooking demonstrations, food stalls, and live entertainment.',
        '🍴 Food Stalls: Taste dishes from various cuisines.
        👩‍🍳 Cooking Demos: Watch live cooking demonstrations.
        🎵 Live Entertainment: Enjoy performances and music.
        🌟 Family Activities: Fun activities for all ages.',
        'No specific prerequisites required. Open to all.',
        'Saturday, September 21st, 2024',
        '11:00 AM - 8:00 PM',
        'Circular Quay, Sydney',
        3,
        -- Sydney
        'Community Event',
        0,
        'images/sydney_food_festival.jpg'
    ),
    (
        'Senior Citizen Social Hour',
        'Senior Citizen Social Hour is a warm and welcoming gathering designed to provide companionship, entertainment, and support for seniors in the community. This event offers an opportunity for older adults to socialize, share stories, and engage in meaningful activities in a friendly and inclusive environment. Whether participants are looking to make new friends, enjoy light refreshments, or simply relax and unwind, Senior Citizen Social Hour aims to promote overall well-being and connectedness among older adults.',
        '👴 Socializing: Participants will have the chance to meet and connect with fellow seniors, fostering friendships and a sense of community. 🎵 Entertainment: Enjoy live music performances, storytelling sessions, or other forms of entertainment to uplift spirits and provide enjoyment. 🎲 Games and Activities: Engage in a variety of games and activities designed to stimulate the mind, encourage social interaction, and promote laughter and fun. 🍵 Refreshments: Light refreshments such as tea, coffee, and snacks will be provided for participants to enjoy during the event. 🗣 Guest Speakers: Occasionally, guest speakers may be invited to share information on topics of interest to seniors, such as health and wellness, financial planning, or local resources and services. 🎉 Special Events: Special themed events or celebrations may be organized for holidays or other occasions, adding extra excitement and enjoyment to the social hour. 🤝 Volunteer Opportunities: Interested individuals can volunteer to help organize and facilitate the social hour, contributing to the success of the event and making a positive difference in the lives of seniors.',
        'No specific prerequisites required. Volunteers of all ages are welcome to participate in this heartwarming event. No prior experience is necessary, just a willingness to connect and share kindness with our senior community members. Sign up on our website or contact us for more details.',
        'Thursday, 16 May, 2024',
        '2:00 PM - 4:00 PM',
        'Blue Hope Community Center, 123 Main Street, Adelaide CBD',
        1,
        -- Adelaide
        'Donation Volunteering',
        0,
        'images/senior.jpg'
    ),
    (
        'Melbourne Clean-up Day',
        'Join the Melbourne Clean-up Day to help keep our city beautiful. Volunteers will work together to clean up parks, streets, and public spaces, promoting environmental stewardship and community pride.',
        '🚮 Litter Collection: Pick up litter in designated areas.
        ♻️ Recycling Activities: Learn about and participate in recycling.
        🗣️ Educational Talks: Hear from experts about waste management.
        🍹 Refreshments: Enjoy snacks and drinks with fellow volunteers.',
        'No specific prerequisites required. Open to all volunteers.',
        'Wednesday, August 22nd, 2024',
        '9:00 AM - 1:00 PM',
        'Various parks and public spaces in Melbourne',
        2,
        -- Melbourne
        'Environmental Volunteering',
        0,
        'images/melbourne_cleanup.jpg'
    ),
    (
        'Beach Clean-up Day',
        'Beach Clean-Up Day is a community-driven initiative aimed at preserving and protecting the natural beauty of Adelaide''s coastline. Participants gather to remove litter and debris from the beach, promoting environmental stewardship and raising awareness about the importance of keeping our oceans clean. This event not only benefits marine life and coastal ecosystems but also fosters a sense of pride and responsibility among volunteers towards their local environment.',
        '🌊 Beach Cleanup: Volunteers will comb the shoreline, picking up litter, plastic waste, and other debris to prevent it from entering the ocean and harming marine life. 🚮 Waste Sorting: Collected items will be sorted into recyclables and non-recyclables, with an emphasis on proper disposal and recycling practices. 🌱 Dune Restoration: In addition to beach cleanup, volunteers may assist with dune restoration efforts, including planting native vegetation to stabilize sand dunes and prevent erosion. 📸 Photo Opportunity: Capture the impact of your efforts and share your beach cleanup experience on social media using designated hashtags to inspire others to join the cause. 🥤 Plastic-Free Picnic: Conclude the cleanup with a plastic-free picnic on the beach, featuring sustainable snacks and refreshments to celebrate a job well done.',
        'No specific prerequisites required. Open to all individuals willing to participate in beach cleanup activities. Children under 18 may require parental supervision.',
        'Saturday, May 15th, 2024',
        '9:00 AM - 12:00 PM',
        'Glenelg Beach, Adelaide',
        1,
        -- Adelaide
        'Donation Volunteering',
        0,
        'images/beach.jpg'
    ),
    (
        'Melbourne Community Art Festival',
        'The Melbourne Community Art Festival brings together local artists to showcase their work and engage with the community. Enjoy live art demonstrations, workshops, and an array of unique artworks.',
        '🎨 Live Painting Sessions: Watch artists create masterpieces in real-time.
    🖌️ Art Workshops: Participate in art workshops suitable for all ages.
    🖼️ Art Exhibit and Sale: View and purchase unique artworks.
    🎶 Live Music: Enjoy performances by local musicians.',
        'No specific prerequisites required. Open to all art enthusiasts and community members.',
        'Sunday, July 15th, 2024',
        '10:00 AM - 5:00 PM',
        'Federation Square, Melbourne',
        2,
        -- Melbourne
        'Community Engagement',
        0,
        'images/melbourne_art_festival.jpg'
    ),
    (
        'Melbourne Food Drive',
        'Participate in the Melbourne Food Drive to collect non-perishable food items for local food banks and shelters. Help make a difference by ensuring that everyone in the community has access to nutritious food.',
        '🍽️ Food Collection: Donate non-perishable food items.
        📦 Sorting: Help sort and pack food donations.
        🚚 Distribution: Assist in delivering food to local shelters.
        👨‍🍳 Cooking Demos: Watch cooking demonstrations using donated items.',
        'No specific prerequisites required. Open to all volunteers.',
        'Thursday, September 5th, 2024',
        '10:00 AM - 4:00 PM',
        'Melbourne City Hall',
        2,
        -- Melbourne
        'Donation Volunteering',
        0,
        'images/melbourne_food_drive.jpg'
    ),
    (
        'Literacy Program for Underprivileged Children',
        'The Literacy Program for Underprivileged Children aims to empower children from disadvantaged backgrounds by providing access to quality educational resources and support. Volunteers will assist with literacy activities such as reading sessions, storytelling, and educational games, helping children develop essential literacy skills and a love for learning. By fostering a positive and supportive learning environment, this program seeks to break the cycle of poverty and empower children to reach their full potential.',
        '📚 Reading Sessions: Volunteers will read books aloud to children, encouraging active listening and comprehension skills while fostering a love for reading. 🎭 Storytelling: Engage children in interactive storytelling sessions, sparking their imagination and creativity through the power of storytelling. 🎨 Educational Games: Facilitate educational games and activities that reinforce literacy skills such as phonics, vocabulary, and spelling in a fun and engaging way. 🖍️ Arts and Crafts: Encourage creativity and self-expression through arts and crafts activities, allowing children to explore their artistic talents and develop fine motor skills. 👩‍🏫 Mentorship and Support: Provide mentorship and support to children, offering encouragement, guidance, and positive reinforcement to help build their confidence and self-esteem.',
        'Volunteers may need to undergo a screening process and commit to attending mentorship sessions. Donations of children''s books are welcome.',
        'Sunday, December 8th',
        '2:00 PM - 5:00 PM',
        'Blue Hope Community Center, 123 Main Street, Adelaide CBD',
        1,
        -- Adelaide
        'Donation Volunteering',
        1,
        'images/literacy.jpg'
    ),
    (
        'Sydney Science Fair',
        'Explore the wonders of science at the Sydney Science Fair. This event features interactive exhibits, hands-on experiments, and educational presentations for all ages. Learn about the latest scientific discoveries and innovations from leading experts.',
        '🔬 Interactive Exhibits: Explore a variety of science exhibits and demonstrations.
        🧪 Hands-On Experiments: Participate in fun and educational science experiments.
        🎤 Guest Speakers: Attend talks and presentations by renowned scientists.
        🧠 Science Trivia: Test your knowledge with science trivia and quizzes.',
        'No specific prerequisites required. Open to all science enthusiasts.',
        'Sunday, December 14th, 2024',
        '10:00 AM - 5:00 PM',
        'Australian Museum, Sydney',
        3,
        -- Sydney
        'Educational Event',
        0,
        'images/science_fair.jpg'
    ),
    (
        'Sydney Community Clean-Up',
        'Join us for the Sydney Community Clean-Up, a volunteer-driven initiative to keep our city clean and beautiful. Volunteers will work together to pick up litter, remove graffiti, and improve public spaces. This event is a great way to give back to the community and make a positive impact on the environment.',
        '🗑️ Litter Pick-Up: Collect and properly dispose of litter in public areas.
        🎨 Graffiti Removal: Help remove graffiti and beautify public spaces.
        🌿 Landscaping: Assist with planting flowers and trees to enhance green spaces.
        ☕ Refreshments: Enjoy free snacks and drinks for all volunteers.',
        'No specific prerequisites required. Open to all community members willing to volunteer.',
        'Saturday, January 18th, 2025',
        '9:00 AM - 1:00 PM',
        'Hyde Park, Sydney',
        3,
        -- Sydney
        'Community Service',
        0,
        'images/community_cleanup.jpg'
    ),
    (
        'Community Health and Wellness Fair',
        'The Community Health and Wellness Fair is a comprehensive event focused on promoting health, wellness, and disease prevention within the local community. Volunteers will assist in organizing and facilitating various health-related activities, educational workshops, and interactive demonstrations aimed at empowering individuals to make informed choices about their health and well-being. From free health screenings and fitness assessments to nutrition consultations and stress management workshops, this fair offers something for everyone to support their journey towards a healthier lifestyle.',
        '🩺 Health Screenings: Provide free health screenings for blood pressure, cholesterol, blood sugar, and other vital health parameters to help attendees assess their overall health status. 💪 Fitness Assessments: Conduct fitness assessments and offer personalized exercise recommendations to promote physical activity and improve fitness levels. 🍎 Nutrition Education: Offer nutrition education sessions and healthy cooking demonstrations to educate attendees about the importance of balanced nutrition and healthy eating habits. 🧘‍♀️ Stress Management Workshops: Lead stress management workshops and mindfulness exercises to help attendees learn techniques for managing stress and enhancing mental well-being. 🌱 Wellness Resources: Provide information and resources on mental health support services, community wellness programs, and local health care providers to connect attendees with valuable resources.',
        'No specific prerequisites required. Open to all individuals interested in health and wellness. Attendees may need to register for certain workshops or screenings in advance.',
        'Saturday, January 25th',
        '10:00 AM - 2:00 PM',
        'Adelaide Community Center, 456 Wellness Way, Adelaide East',
        1,
        -- Adelaide
        'Donation Volunteering',
        1,
        'images/health.jpg'
    ),
    (
        'Nature Trail Maintenance',
        'Nature Trail Maintenance is a hands-on opportunity to help preserve and enhance our local natural spaces for the enjoyment of all. Volunteers will assist with trail maintenance tasks such as clearing debris, repairing signage, and improving accessibility. This event promotes environmental stewardship, encourages outdoor recreation, and fosters a sense of connection with nature.',
        '🌿 Trail Clearing: Clear vegetation, fallen branches, and other obstacles from hiking trails to ensure safe and enjoyable outdoor experiences for visitors. 🚶‍♂️ Trail Marking: Install and maintain trail markers, signs, and maps to help guide hikers and prevent them from getting lost. 🔨 Infrastructure Repair: Repair and maintain bridges, boardwalks, and other trail infrastructure to prevent deterioration and ensure long-term usability. 🌳 Habitat Restoration: Assist with habitat restoration efforts such as planting native trees and removing invasive species to promote biodiversity and ecosystem health. 🌄 Scenic Overlook Cleanup: Clear litter and debris from scenic overlooks and viewpoints to preserve the natural beauty of these areas and enhance visitor experiences.',
        'No specific prerequisites required. Volunteers of all ages and fitness levels are welcome to participate in this rewarding outdoor activity.',
        'Saturday, 6 July, 2024',
        '9:00 AM - 12:00 PM',
        'Local Nature Reserve, Meeting Point: Parking Lot, 123 Oak Street, Adelaide Suburbs',
        1,
        -- Adelaide
        'Donation Volunteering',
        1,
        'images/trail.jpg'
    ),
    (
        'Sydney Holiday Toy Drive',
        'Spread holiday cheer by participating in the Sydney Holiday Toy Drive. Collect and distribute toys to children in need, ensuring that every child experiences the joy of the holiday season.',
        '🎁 Toy Collection: Donate new or gently used toys.
        🎀 Gift Wrapping: Help wrap and prepare toys for distribution.
        🚚 Distribution: Deliver toys to local shelters and centers.
        🎅 Holiday Activities: Enjoy festive activities and entertainment.',
        'No specific prerequisites required. Open to all volunteers.',
        'Monday, December 18th, 2024',
        '10:00 AM - 4:00 PM',
        'Darling Harbour, Sydney',
        3,
        -- Sydney
        'Donation Volunteering',
        0,
        'images/sydney_toy_drive.jpg'
    ),
    (
        'Sydney Volunteer Appreciation Night',
        'Celebrate the contributions of volunteers at the Sydney Volunteer Appreciation Night. Enjoy an evening of recognition, entertainment, and refreshments.',
        '🎉 Recognition Ceremony: Honor outstanding volunteers.
        🎤 Live Entertainment: Performances by local artists.
        🍷 Refreshments: Enjoy drinks and appetizers.
        🗣️ Networking: Connect with fellow volunteers.',
        'No specific prerequisites required. Open to all volunteers.',
        'Thursday, October 10th, 2024',
        '6:00 PM - 9:00 PM',
        'Sydney Town Hall',
        3,
        -- Sydney
        'Community Event',
        0,
        'images/sydney_volunteer_appreciation.jpg'
    ),
    (
        'Community Senior Fitness Class',
        'Community Senior Fitness Class is a fun and inclusive exercise program designed specifically for older adults to improve strength, flexibility, and overall well-being. Volunteers will lead fitness sessions tailored to the needs and abilities of seniors, providing encouragement and support to help participants stay active and healthy. This event promotes healthy aging, socialization, and a sense of community among older adults.',
        '🏋️‍♀️ Gentle Exercise: Lead low-impact exercises such as stretching, light aerobics, and chair-based movements to improve mobility, flexibility, and balance. 🧘‍♂️ Relaxation Techniques: Guide participants through relaxation and breathing exercises to reduce stress, promote relaxation, and enhance overall mental well-being. 🎶 Music and Movement: Incorporate music and rhythmic movements into fitness routines to make exercise more enjoyable and engaging for participants. 👫 Social Interaction: Create opportunities for participants to socialize and connect with one another, fostering a supportive and encouraging exercise environment. 🍵 Refreshments: Offer light refreshments such as water and healthy snacks to participants, promoting hydration and post-workout recovery.',
        'No specific prerequisites required. Volunteers with experience in leading group fitness classes or a passion for promoting healthy aging are welcome to participate and inspire seniors to stay active.',
        'Wednesday, 10 July, 2024',
        '10:00 AM - 11:00 AM',
        'Senior Community Center, 456 Pine Street, Adelaide CBD',
        1,
        -- Adelaide
        'Donation Volunteering',
        1,
        'images/fitness.jpg'
    ),
    (
        'Community Art Workshop',
        'Community Art Workshop is a creative and collaborative event that provides individuals of all ages and skill levels with the opportunity to explore their artistic talents and express themselves through various art forms. Volunteers will facilitate art activities, offer guidance and encouragement, and create a supportive and inclusive environment for participants to unleash their creativity.',
        '🎨 Painting and Drawing: Provide supplies and guidance for participants to create paintings, drawings, and sketches inspired by their imagination or a given theme. 🖌️ Mixed Media Art: Explore different art techniques and materials such as collage, printmaking, and sculpture to create unique and expressive artworks. 🎭 Creative Expression: Encourage participants to experiment with color, shape, and texture to convey emotions, stories, and personal experiences through their art. 🖼️ Art Exhibition: Showcase participants'' artworks in a gallery-style exhibition to celebrate their creativity and provide opportunities for feedback and reflection. 👩‍🎨 Artist Talks: Invite local artists to share their insights and experiences with participants, inspiring them to pursue their artistic passions and explore new artistic avenues.',
        'No specific prerequisites required. Volunteers with a passion for art, creativity, and community engagement are welcome to participate and inspire others to embrace their artistic side.',
        'Saturday, 20 July, 2024',
        '1:00 PM - 3:00 PM',
        'Community Arts Center, 789 Elm Street, Adelaide CBD',
        1,
        -- Adelaide
        'Donation Volunteering',
        1,
        'images/art.jpg'
    ),
    (
        'Community Blood Drive',
        'Community Blood Drive is a lifesaving event that provides individuals with the opportunity to donate blood and help patients in need. Volunteers will assist with registration, donor education, and post-donation care, ensuring a smooth and successful blood donation process. This event promotes altruism, community solidarity, and the gift of life through blood donation.',
        '🩸 Donor Registration: Greet donors, collect personal information, and guide them through the registration process before their blood donation. 🩸 Donor Education: Provide information about the importance of blood donation, eligibility criteria, and the donation process to help donors feel informed and confident. 🩸 Post-Donation Care: Offer refreshments and monitor donors for any signs of discomfort or adverse reactions following their blood donation, ensuring their well-being. 🩸 Volunteer Support: Assist with logistical tasks such as setting up donation stations, managing crowds, and maintaining a clean and organized donation environment. 🩸 Donor Appreciation: Express gratitude to blood donors for their generous contributions and highlight the impact of their donations on saving lives and supporting medical treatments.',
        'No specific prerequisites required. Volunteers of all ages are welcome to participate and support the lifesaving mission of the blood drive.',
        'Saturday, 27 July, 2024',
        '9:00 AM - 3:00 PM',
        'Community Blood Donation Center, 123 Oak Street, Adelaide CBD',
        1,
        -- Adelaide
        'Donation Volunteering',
        1,
        'images/blood.jpg'
    ),
    (
        'Community Bike Repair Workshop',
        'Community Bike Repair Workshop is a hands-on event that provides individuals with the opportunity to learn basic bike repair and maintenance skills. Volunteers will lead repair demonstrations, assist participants with fixing their bikes, and promote sustainable transportation options within the community. This event promotes bike safety, environmental consciousness, and self-sufficiency in bike maintenance.',
        '🔧 Repair Demonstrations: Demonstrate basic bike repair techniques such as fixing flat tires, adjusting brakes, and lubricating chains to empower participants with practical skills. 🚲 Hands-On Repair Stations: Set up repair stations with tools and equipment where participants can work on their bikes under the guidance and supervision of volunteers. 🔩 Bike Inspections: Inspect participants'' bikes for any mechanical issues or safety concerns, providing recommendations for repairs or adjustments as needed. 🚲 Safety Checks: Perform safety checks on participants'' bikes to ensure they are roadworthy and compliant with safety standards, promoting safe cycling practices. 📚 Educational Resources: Provide educational resources and handouts on bike maintenance, safety tips, and local biking routes to encourage continued learning and exploration.',
        'No specific prerequisites required. Volunteers with experience in bike repair or a passion for cycling are welcome to participate and share their knowledge with others.',
        'Sunday, 4 August, 2024',
        '10:00 AM - 12:00 PM',
        'Community Bike Repair Shop, 456 Elm Street, Adelaide CBD',
        1,
        -- Adelaide
        'Donation Volunteering',
        1,
        'images/bike.jpg'
    ),
    (
        'Community Park Cleanup',
        'Community Park Cleanup is a community-wide effort to beautify and maintain our local parks and green spaces. Volunteers will work together to pick up litter, remove invasive plants, and beautify park amenities, ensuring a clean, safe, and enjoyable environment for all. This event promotes civic pride, environmental stewardship, and community engagement.',
        '🌳 Litter Cleanup: Collect and properly dispose of litter and debris found throughout the park, including trash, recyclables, and organic waste, to restore its natural beauty. 🌱 Invasive Plant Removal: Identify and remove invasive plant species that threaten the biodiversity of the park and compete with native vegetation for resources. 🧹 Amenities Maintenance: Sweep sidewalks, clean benches and picnic tables, and empty trash receptacles to maintain park amenities and enhance visitor experiences. 🌸 Beautification Projects: Plant flowers, shrubs, and native plants in designated areas to enhance the aesthetic appeal of the park and attract pollinators such as butterflies and bees. 🌳 Tree Care: Mulch, water, and prune trees to promote their health and longevity, ensuring a thriving urban forest for future generations to enjoy.',
        'No specific prerequisites required. Volunteers of all ages and abilities are welcome to participate in this rewarding outdoor activity.',
        'Saturday, 10 August, 2024',
        '9:00 AM - 12:00 PM',
        'City Park, Meeting Point: Pavilion Area, 789 Maple Avenue, Adelaide CBD',
        1,
        -- Adelaide
        'Donation Volunteering',
        1,
        'images/park.jpg'
    ),
    (
        'Melbourne Art Exhibition',
        'Discover the works of local artists at the Melbourne Art Exhibition. This event showcases a diverse range of artworks, including paintings, sculptures, and digital art. Attendees can meet the artists, participate in workshops, and purchase unique pieces to support the local art community.',
        '🎨 Art Viewing: Browse a variety of artworks on display.
        🖌️ Workshops: Participate in art workshops led by featured artists.
        🛍️ Art Market: Purchase artworks and crafts from local vendors.
        🗣️ Artist Talks: Attend talks and Q&A sessions with the artists.',
        'No specific prerequisites required. Open to all art enthusiasts.',
        'Friday, August 15th, 2024',
        '10:00 AM - 6:00 PM',
        'Federation Square, Melbourne',
        2,
        -- Melbourne
        'Community Event',
        0,
        'images/art_exhibition.jpg'
    ),
    (
        'Fundraising BBQ Cook-Off',
        'A fundraising BBQ cook-off is a lively event where participants showcase their grilling skills while raising funds for a charitable cause. Teams compete against each other to create the most delicious BBQ dishes, which are then sampled and judged by attendees. This event not only provides an opportunity for friendly competition but also fosters community spirit and support for the organization''s mission.',
        '🔥 BBQ Cook-Off Competition: Teams will set up their grills and prepare their signature BBQ dishes, ranging from ribs and brisket to chicken and vegetarian options. 👨‍🍳 Cooking Demonstrations: Professional chefs will offer cooking demonstrations and tips for mastering the art of BBQ. 🎶 Live Music: Enjoy live music performances from local bands and musicians, creating a festive atmosphere for attendees to enjoy. 🍔 Food Tastings: Attendees can purchase tasting tickets to sample a variety of BBQ dishes and vote for their favorites. 🎁 Raffle Prizes: Enter to win exciting raffle prizes donated by local businesses and sponsors, with all proceeds going towards the fundraising efforts.',
        'Teams participating in the BBQ cook-off must register in advance. Spectators can purchase tickets to attend the event.',
        'Saturday, June 15th',
        '12:00 PM - 5:00 PM',
        'Adelaide Central Park, 123 BBQ Lane, Adelaide CBD',
        1,
        -- Adelaide
        'Donation Volunteering',
        0,
        'images/bbq.jpg'
    ),
    (
        'Melbourne Charity Run',
        'Join the Melbourne Charity Run to support local charities and promote a healthy lifestyle. Participants can choose from various race distances and enjoy a day of running, fun, and community spirit. All proceeds from the event will go to support local charities.',
        '🏃‍♂️ 5K, 10K, Half Marathon: Choose your race distance and run to support a good cause.
        🎉 Entertainment: Enjoy live music and entertainment throughout the event.
        🏅 Awards: Receive medals and awards for top finishers.
        🍎 Refreshments: Free snacks and drinks for all participants.',
        'Participants must register online and pay the registration fee. Open to runners of all skill levels.',
        'Sunday, October 12th, 2024',
        '7:00 AM - 12:00 PM',
        'Royal Botanic Gardens, Melbourne',
        2,
        -- Melbourne
        'Fundraising Event',
        0,
        'images/charity_run.jpg'
    ),
    (
        'Animal Shelter Assistance',
        'Animal Shelter Assistance provides volunteers with the opportunity to make a positive impact on the lives of animals in need. Participants will assist staff at the local animal shelter with various tasks aimed at ensuring the well-being and comfort of shelter animals. From feeding and grooming to socializing and enrichment activities, volunteers play a crucial role in helping animals feel loved, cared for, and ready for adoption.',
        '🐾 Feeding and Watering: Volunteers will help with the preparation and distribution of meals for shelter animals, ensuring they receive proper nutrition and hydration. 🚿 Grooming and Bathing: Participants will assist with grooming sessions, including brushing, bathing, and grooming, to keep animals clean, healthy, and comfortable. 🤗 Socialization: Spend quality time with shelter animals by engaging in playtime, cuddling, and offering companionship to help reduce stress and anxiety. 🧩 Enrichment Activities: Create and implement enrichment activities and games to stimulate the minds and bodies of shelter animals, promoting their physical and mental well-being. 🧹 Cleaning and Maintenance: Assist with daily cleaning tasks, such as sanitizing kennels, litter boxes, and communal areas, to maintain a clean and hygienic environment for animals and staff.',
        'Volunteers may need to attend a volunteer orientation session at the animal shelter before participating. Minimum age requirements may apply for certain tasks.',
        'Saturday, June 6th, 2024',
        '11:00 AM - 2:00 PM',
        'Adelaide Animal Rescue Shelter, 555 Pine Avenue, North Adelaide',
        1,
        -- Adelaide
        'Donation Volunteering',
        0,
        'images/animal.jpg'
    ),
    (
        'Environmental Workshop and Tree Planting',
        'An environmental workshop and tree planting event is a hands-on opportunity for volunteers to learn about the importance of environmental conservation and contribute to the greening of their community. Participants will engage in educational workshops on topics such as native flora and fauna, sustainable gardening practices, and the impact of climate change. Following the workshops, volunteers will plant trees in designated areas, helping to improve air quality, provide habitat for wildlife, and beautify the local landscape.',
        '🌿 Environmental Workshops: Attendees will participate in interactive workshops led by environmental experts, learning about topics such as native plant species, water conservation, and waste reduction. 🌳 Tree Planting: Volunteers will gather at designated planting sites to plant trees, shrubs, and other native vegetation, following proper planting techniques and guidelines provided by experienced volunteers. 📸 Photo Contest: Capture the beauty of nature and the community spirit during the event by participating in a photo contest. Prizes will be awarded for the most creative and impactful photos. 🍃 Nature Walk: Explore the natural surroundings of the planting site with guided nature walks led by knowledgeable guides, offering insights into the local ecosystem and biodiversity. 🎨 Art Corner: Express your creativity through nature-themed art activities, including leaf rubbings, seed art, and eco-friendly crafts.',
        'Registration may be required to participate in the workshop and tree planting activities. Open to all individuals interested in environmental conservation.',
        'Saturday, July 20th',
        '9:00 AM - 2:00 PM',
        'Adelaide Botanic Garden, Friends Gate Entrance, North Terrace, Adelaide',
        1,
        -- Adelaide
        'Donation Volunteering',
        0,
        'images/tree.jpg'
    ),
    (
        'Homeless Shelter Support and Care Package Distribution',
        'Homeless Shelter Support and Care Package Distribution is a compassionate initiative aimed at providing essential support and resources to individuals experiencing homelessness in the community. Volunteers will assist at a local homeless shelter by serving meals, organizing clothing donations, and offering companionship to shelter residents. Additionally, volunteers will assemble care packages containing hygiene items, non-perishable food items, and warm clothing to distribute to individuals living on the streets, offering them practical assistance and a sense of dignity.',
        '🍲 Meal Service: Volunteers will help prepare and serve meals at the homeless shelter, ensuring that residents receive nutritious and satisfying meals. 👕 Clothing Organization: Assist with sorting and organizing clothing donations, ensuring that residents have access to clean and appropriate clothing items. 🤝 Companionship: Engage in conversations and provide companionship to shelter residents, offering support and empathy during their stay. 🎁 Care Package Assembly: Collaborate with fellow volunteers to assemble care packages containing essential items such as toiletries, socks, gloves, blankets, and non-perishable food items. 🚗 Distribution Drive: Participate in a distribution drive to hand out care packages to individuals living on the streets, offering them vital resources and a sense of hope.',
        'No specific prerequisites required. Open to all individuals willing to donate supplies or volunteer at the homeless shelter.',
        'Saturday, November 16th',
        '11:00 AM - 3:00 PM',
        'Adelaide Homeless Shelter, 123 Hope Street, Adelaide CBD',
        1,
        -- Adelaide
        'Donation Volunteering',
        0,
        'images/homeless.jpg'
    ),
    (
        'Melbourne Music Festival',
        'Experience the vibrant Melbourne Music Festival, featuring performances from local bands, food stalls, and entertainment for all ages. A perfect event to enjoy with family and friends.',
        '🎤 Live Music: Performances from local bands and artists.
        🍴 Food Stalls: Sample a variety of cuisines.
        🎉 Entertainment: Enjoy activities and games for all ages.
        🌟 Meet and Greet: Meet your favorite artists.',
        'No specific prerequisites required. Open to music lovers of all ages.',
        'Saturday, October 12th, 2024',
        '11:00 AM - 10:00 PM',
        'Royal Botanic Gardens, Melbourne',
        2,
        -- Melbourne
        'Community Event',
        0,
        'images/melbourne_music_festival.jpg'
    ),
    (
        'Melbourne Charity Auction',
        'Join us for the Melbourne Charity Auction to support various community initiatives. Bid on unique items and experiences while enjoying an evening of entertainment and refreshments.',
        '🖼️ Auction: Bid on unique items and experiences.
        🍷 Refreshments: Enjoy drinks and appetizers.
        🎤 Live Entertainment: Performances by local artists.
        💬 Networking: Meet and connect with community members.',
        'No specific prerequisites required. Open to all.',
        'Friday, November 15th, 2024',
        '6:00 PM - 9:00 PM',
        'Melbourne Town Hall',
        2,
        -- Melbourne
        'Fundraising Event',
        0,
        'images/melbourne_charity_auction.jpg'
    ),
    (
        'Sydney Music Festival',
        'The Sydney Music Festival is a celebration of live music featuring performances by local and international artists across various genres. Enjoy a weekend filled with amazing music, food stalls, and a vibrant festival atmosphere.',
        '🎤 Live Performances: Enjoy live music from a variety of artists and bands.
        🍴 Food Stalls: Sample delicious food from local vendors.
        🎡 Festival Activities: Participate in fun festival activities and games.
        🌟 Meet and Greet: Meet your favorite artists and get autographs.',
        'No specific prerequisites required. Open to music lovers of all ages.',
        'Saturday, November 8th, 2024',
        '12:00 PM - 11:00 PM',
        'Sydney Opera House, Sydney',
        3,
        -- Sydney
        'Community Event',
        0,
        'images/music_festival.jpg'
    ),
    (
        'Community Library Storytime',
        'Community Library Storytime is a delightful program designed to promote literacy, creativity, and a love of reading among children in our community. Volunteers will take on the roles of storytellers, captivating young audiences with engaging tales and interactive activities. This event encourages imagination, curiosity, and a lifelong appreciation for the magic of storytelling.',
        '📚 Storytelling Sessions: Volunteers will read aloud from a selection of children''s books, bringing characters and adventures to life through expressive storytelling. 🎨 Craft Stations: Set up craft stations where children can create themed crafts related to the stories they hear, fostering creativity and artistic expression. 🎵 Sing-Alongs: Lead sing-along sessions with popular children''s songs and rhymes, encouraging participation and movement. 🌟 Character Visits: Occasionally, special guest characters such as book mascots or local celebrities may make surprise appearances to delight and inspire young readers. 📚 Book Recommendations: Offer personalized book recommendations and reading tips to parents and caregivers, promoting a culture of literacy at home.',
        'No specific prerequisites required. Volunteers with a passion for storytelling and working with children are welcome to participate and share the joy of reading.',
        'Saturday, 22 June, 2024',
        '10:30 AM - 12:00 PM',
        'City Central Public Library, 234 Elm Street, Adelaide CBD',
        1,
        -- Adelaide
        'Donation Volunteering',
        1,
        'images/library.jpg'
    ),
    (
        'Sydney Charity Run',
        'Join us for the Sydney Charity Run to raise funds for local charities. Whether you’re a seasoned runner or a casual jogger, everyone is welcome to participate and support a good cause.',
        '🏃‍♂️ 5K, 10K, and Half-Marathon: Choose your preferred distance.
        🔥 Warm-Up Sessions: Participate in warm-up exercises.
        🎉 Post-Race Celebration: Enjoy food, music, and awards.
        🏅 Award Ceremony: Prizes for top finishers.',
        'Registration required. Open to all ages and fitness levels.',
        'Sunday, October 20th, 2024',
        '8:00 AM - 12:00 PM',
        'Sydney Harbour',
        3,
        -- Sydney
        'Fundraising Event',
        0,
        'images/sydney_charity_run.jpg'
    ),
    (
        'Sydney Beach Clean-Up',
        'Help preserve Sydney’s beautiful beaches by participating in the Sydney Beach Clean-Up. Volunteers will collect trash and debris from the shoreline, promoting ocean conservation and environmental awareness.',
        '🌊 Beach Litter Collection: Clean up trash from the beach.
        ♻️ Recycling: Sort collected items for recycling.
        🐠 Marine Conservation Talks: Learn about ocean conservation.
        🍉 Refreshments: Snacks and drinks for volunteers.',
        'No specific prerequisites required. Open to all volunteers.',
        'Saturday, November 12th, 2024',
        '9:00 AM - 1:00 PM',
        'Bondi Beach, Sydney',
        3,
        -- Sydney
        'Environmental Volunteering',
        0,
        'images/sydney_beach_cleanup.jpg'
    );

-- Insert data into the news table
INSERT INTO
    news (
        is_private,
        news_title,
        news_body,
        news_im_path,
        branch_id
    )
VALUES
    (
        0,
        "Sydney Volunteers Build Shelters for the Homeless",
        "In an effort to combat homelessness, volunteers in Sydney came together to build shelters for those in need.
        The project, organized by Blue Hope Volunteer Organization, has provided much-needed support and comfort to many homeless
        individuals. Volunteers constructed temporary shelters equipped with basic amenities, including beds, heating, and sanitation
        facilities, offering a safe and secure space for individuals and families experiencing homelessness.
        The project began with a comprehensive planning phase, where volunteers and community leaders identified suitable locations
        for the shelters and sourced necessary materials. Local businesses and donors contributed supplies, including construction materials,
         bedding, and personal hygiene products. The community's support played a crucial role in the project's success.
        Construction took place over several weekends, with volunteers working tirelessly to assemble the shelters. Each shelter was designed
        to be weather-resistant and durable, ensuring safety and comfort for the occupants. The shelters are also equipped with solar-powered lighting,
        promoting sustainable living solutions.
        In addition to providing shelter, the project included various support services to address the broader needs of homeless individuals.
        Medical professionals volunteered their time to offer free checkups and vaccinations, ensuring that the occupants received essential healthcare.
        Food distribution was organized daily, with volunteers preparing and delivering nutritious meals to the shelters.
        Furthermore, social workers and counselors were available to provide emotional support and guidance. They assisted individuals in accessing social services,
        such as job placement programs, mental health counseling, and addiction recovery resources. This holistic approach aimed to address the root causes of homelessness and support long-term solutions.
        ",
        "images/shelter_build.jpg",
        3 -- Sydney,
    ),
    (
        0,
        "Melbourne Art Festival Showcases Local Talent",
        "The Melbourne Community Art Festival was a huge success, showcasing the work of local artists and providing a platform for creative expression. Held in the heart of Melbourne, the festival transformed public spaces into vibrant galleries and performance areas, attracting thousands of attendees over the weekend.
        The festival featured live art demonstrations where artists created works on-site, allowing attendees to witness the artistic process in real-time. These demonstrations included everything from large-scale murals to intricate sculptures, providing a fascinating insight into the techniques and skills of the artists.
        Numerous workshops were available for participants of all ages and skill levels, offering instruction in various art forms such as painting, sculpture, digital art, and mixed media. Professional artists led these workshops, providing hands-on experiences and enabling attendees to create their own pieces under expert guidance. These workshops not only fostered creativity but also served as a learning platform for aspiring artists.
        The art exhibit showcased a wide range of works, including traditional paintings, modern sculptures, and cutting-edge digital art. The diversity of the artwork reflected the rich cultural tapestry of Melbourne and highlighted the city's thriving arts scene. Attendees had the opportunity to meet the artists, discuss their work, and even purchase unique pieces directly from the creators.
        In addition to visual arts, the festival included performances by local musicians and dancers, adding to the vibrant atmosphere. Stages were set up throughout the festival grounds, featuring live music, dance performances, and theatrical acts. These performances celebrated the cultural diversity of Melbourne, with acts representing various traditions and styles.
        Food stalls offering a variety of cuisines added to the festival experience, allowing attendees to enjoy delicious food while exploring the art. Local food vendors provided a diverse range of options, from gourmet dishes to street food, catering to all tastes.
        The Melbourne Community Art Festival celebrated the rich cultural diversity of the city and provided a space for artists to connect with the community. It fostered a sense of unity and appreciation for the arts, encouraging dialogue and interaction between artists and the public. The festival's success highlights the importance of supporting local talent and promoting creative expression in the community.",
        "images/melbourne_art_festival.jpg",
        2 -- Melbourne
    ),
    (
        0,
        "Adelaide Hosts Successful Fundraiser for Local Animal Shelter",
        "Blue Hope Volunteer Organization recently hosted a successful fundraiser to support a local animal shelter in Adelaide. The event featured a silent auction, live music, and a pet adoption drive. Volunteers and community members came together to raise over $50,000, which will go towards providing food, medical care, and shelter improvements for abandoned and rescued animals.
        The silent auction included a wide range of items donated by local businesses and individuals, from artwork and handcrafted goods to vacation packages and dining experiences. Live music performances by local bands created a festive atmosphere, encouraging attendees to participate in the bidding.
        One of the highlights of the event was the pet adoption drive, where shelter animals were showcased in hopes of finding them loving homes. Volunteers and shelter staff were on hand to provide information about each animal and facilitate the adoption process. Many pets found new families, which was a heartwarming success.
        In addition to fundraising, the event included educational sessions on responsible pet ownership and animal welfare. Experts gave talks on topics such as pet health care, training, and the importance of spaying and neutering. Informational booths distributed pamphlets and resources to attendees.
        The funds raised will significantly enhance the shelter's capacity to care for animals in need, demonstrating the power of community support in making a positive impact. The success of the fundraiser underscores the community’s commitment to animal welfare and the collective effort to improve the lives of abandoned and rescued animals.",
        "images/animal_shelter_fundraiser.jpg",
        1 -- Adelaide
    ),
    (
        0,
        "Adelaide Community Hosts Charity Bake Sale for Local Schools",
        "Blue Hope volunteers organized a charity bake sale in Adelaide to raise funds for local schools. The event featured a wide variety of homemade baked goods, including cakes, cookies, and pastries. Community members eagerly supported the cause, and the sale raised over $5,000.
        The funds raised from the bake sale will be used to purchase educational supplies, support extracurricular programs, and improve school facilities. Volunteers worked tirelessly to bake and sell the goods, showcasing their dedication and community spirit. The success of the bake sale highlights the importance of collective efforts in supporting educational initiatives.
        In addition to the sale of baked goods, the event featured cooking demonstrations where local chefs shared their favorite recipes and baking tips. These demonstrations attracted large crowds, providing an educational component to the fundraiser and encouraging community members to try new recipes at home.
        The bake sale also included a children's corner, where kids could decorate their own cupcakes and cookies. This interactive activity was a hit among young attendees and added a fun element to the event.
        Local businesses and community members donated baking supplies and ingredients, showing their support for the cause. The event concluded with a raffle, where participants had the chance to win baking-related prizes, further boosting the funds raised.
        Overall, the charity bake sale not only provided much-needed financial support but also brought the community together in a fun and meaningful way. The event's success demonstrates the community's commitment to improving local schools and supporting educational programs.",
        "images/bake_sale.jpg",
        1 -- Adelaide
    ),
    (
        0,
        "Sydney Music Festival Draws Record Crowds",
        "The Sydney Music Festival drew record crowds this year, with thousands of attendees enjoying live performances from local and international artists. The festival, held at the iconic Sydney Harbour, featured food stalls and various festival activities.
        Attendees experienced a diverse lineup of musical genres, from rock and pop to classical and jazz. In addition to the music, the festival offered art installations, craft markets, and interactive activities for all ages. The event provided a platform for emerging artists and fostered a sense of community through shared cultural experiences.
        The overwhelming attendance and positive feedback highlight the festival's success in bringing people together. The festival not only celebrated music but also promoted cultural exchange and appreciation, making it a memorable event for all who attended.
        Highlights included a special tribute performance to legendary artists and a showcase of new talents from the local music scene. Interactive music workshops allowed attendees to engage with musicians and learn about different instruments and music styles.
        Food stalls offered a variety of cuisines, giving attendees the chance to sample dishes from around the world. The festival also featured a children's zone with activities such as face painting, balloon art, and musical games, ensuring fun for the whole family.
        The Sydney Music Festival's success was also due to the excellent organization and support from volunteers, local businesses, and sponsors. The event concluded with a spectacular fireworks display over the harbour, leaving attendees with unforgettable memories.
        The festival's success highlights the importance of cultural events in promoting community spirit and supporting the arts. Plans are already underway for next year's festival, with organizers aiming to make it even bigger and better.",
        "images/sydney_music_festival.jpg",
        3 -- Sydney
    ),
    (
        0,
        "Adelaide Charity Run Promotes Healthy Living",
        "The annual Adelaide Charity Run organized by Blue Hope drew participants from all over the city, promoting healthy living and raising funds for community health programs. Runners of all ages and fitness levels participated in the event, which included a 5K, 10K, and half-marathon.
        The funds raised from the run will support local health initiatives, such as free health screenings, fitness classes, and nutrition workshops. The event also featured health and wellness booths, providing participants with information and resources on maintaining a healthy lifestyle.
        Participants enjoyed scenic routes through the city’s parks and waterfronts, with water stations and cheering crowds along the way. The post-run celebration included live music, food stalls, and award ceremonies for top finishers in various categories.
        The run also included a kids’ fun run, encouraging families to participate and promote healthy habits from a young age. Local fitness trainers led warm-up exercises before the races, ensuring participants were ready and energized.
        Health professionals were available at the wellness booths to offer advice on topics such as exercise, diet, and mental health. Free health checks, including blood pressure and glucose level tests, were offered to participants, emphasizing the event's focus on overall well-being.
        The Adelaide Charity Run has become a beloved tradition, bringing the community together for a good cause. The event's success highlights the community's commitment to supporting health initiatives and promoting active lifestyles. Plans are already in place for next year's run, with organizers aiming to attract even more participants and raise additional funds for local health programs.",
        "images/charity_run_adelaide.jpg",
        1 -- Adelaide
    ),
    (
        0,
        "Adelaide Residents Volunteer to Clean Up Local Beaches and Waterways",
        "Adelaide residents have stepped up to the challenge of preserving the natural beauty of their coastal areas by participating in volunteer-led clean-up efforts along local beaches and waterways. The clean-up events are part of an ongoing campaign to combat pollution and protect marine life.

        Volunteers gathered early in the morning at designated meeting points, where they were provided with all necessary equipment, including gloves, bags, and litter pickers. Teams were formed and assigned specific areas to clean, ensuring comprehensive coverage of the targeted locations.

        Throughout the day, volunteers collected hundreds of kilograms of trash, including plastics, metals, and other debris. The event also served as an educational opportunity, raising awareness about the impacts of littering and the importance of environmental stewardship. Local environmental experts were on hand to educate participants about marine ecosystems and the dangers of pollution.

        The success of these clean-up drives demonstrates the community’s commitment to maintaining a clean and healthy environment. Volunteers were provided with all necessary equipment, including gloves, bags, and litter pickers. Local environmental experts were on hand to educate participants about marine ecosystems and the dangers of pollution. The events concluded with a social gathering where volunteers shared their experiences and discussed future conservation initiatives.

        After the clean-up activities, participants gathered for a picnic lunch provided by local sponsors. The event also featured guest speakers from environmental organizations who shared insights on ongoing conservation efforts and ways to get involved. The day concluded with a sense of accomplishment and a renewed commitment to protecting the environment.",
        "images/cleanBeaches.jpg",
        1 -- Adelaide
    ),
    (
        0,
        "Melbourne Volunteers Launch New Community Garden",
        "Melbourne volunteers have come together to launch a new community garden aimed at promoting urban agriculture and sustainability. The garden will provide fresh produce for local residents and serve as a green space for the community.

        The project kicked off with a groundbreaking ceremony attended by local officials, community leaders, and volunteers. Participants worked together to clear the land, build raised beds, and plant a variety of vegetables, herbs, and flowers. The garden features raised beds, a composting area, and a rainwater harvesting system.

        Volunteers of all ages participated in the initial planting, and the garden will be maintained through ongoing community efforts. The project includes educational programs on gardening techniques, composting, and water conservation. Workshops and community events will be held regularly to engage residents and provide ongoing support for the garden. These programs aim to teach sustainable practices and encourage healthy eating habits.

        By fostering a sense of ownership and pride, the community garden initiative promotes healthier living and strengthens community ties. The garden also provides a space for social interaction and collaboration, bringing people together to work towards a common goal. The project has received support from local businesses and government, highlighting the collaborative effort behind its success.

        The garden will also host events such as farmers' markets, cooking demonstrations, and seasonal festivals, further enhancing its role as a community hub. The success of the community garden project underscores the importance of urban green spaces in promoting environmental sustainability and community well-being.",
        "images/melbourne_garden.jpg",
        2 -- Melbourne
    ),
    (
        0,
        "Adelaide Hosts Workshop on Mental Health Awareness",
        "Blue Hope recently organized a workshop on mental health awareness in Adelaide, aimed at reducing stigma and providing support to those struggling with mental health issues. The workshop featured presentations by mental health professionals, interactive discussions, and resource distribution.

        Held at a local community center, the workshop attracted a diverse group of attendees, including individuals facing mental health challenges, their families, and healthcare professionals. The workshop began with an introduction to common mental health conditions, symptoms, and available treatments.

        Attendees learned about coping strategies, available support services, and how to support loved ones facing mental health challenges. The event was well-attended, with many participants expressing gratitude for the valuable information and support provided. This initiative is part of Blue Hope's ongoing efforts to promote mental well-being in the community.

        The workshop also included mindfulness exercises, stress management techniques, and a panel discussion where attendees could ask questions and share their experiences. Mental health professionals led interactive sessions on topics such as self-care, building resilience, and accessing community resources. The event also featured booths from local mental health organizations, providing attendees with additional information and resources.

        Follow-up sessions and support groups were established to provide ongoing assistance to participants. Attendees were encouraged to join these groups to continue their journey towards mental wellness and build a supportive network. The success of the workshop highlights the importance of mental health education and community support in addressing mental health issues.

        The day concluded with a guided meditation session, leaving attendees feeling calm and empowered. Feedback from participants was overwhelmingly positive, with many expressing a desire for more such events in the future. The workshop not only provided valuable information but also created a safe space for open discussions about mental health.",
        "images/mental_health_workshop.jpg",
        1 -- Adelaide
    ),
    (
        0,
        "Melbourne Food Drive Supports Hundreds of Families",
        "The Melbourne Food Drive collected and distributed thousands of non-perishable food items to local food banks, helping hundreds of families in need. Volunteers worked tirelessly to ensure the success of the event.

        Organized by Blue Hope in collaboration with local businesses and schools, the food drive featured multiple collection points across the city. Community members were encouraged to donate non-perishable food items, which were then sorted and packed by volunteers.

        The food drive was organized in partnership with local businesses and schools, which provided collection points for donations. Volunteers sorted and packed the food items, which were then distributed to families and individuals facing food insecurity. The event not only provided essential support to those in need but also brought the community together in a shared effort to combat hunger.

        The food drive included public awareness campaigns to educate the community about food insecurity and encourage donations. Special care packages were prepared for families with specific dietary needs, ensuring that everyone received appropriate and nutritious food.

        On the distribution day, volunteers delivered food packages to various local food banks and directly to families in need. The event not only provided essential support to those in need but also brought the community together in a shared effort to combat hunger. The food drive included public awareness campaigns to educate the community about food insecurity and encourage donations. Special care packages were prepared for families with specific dietary needs, ensuring that everyone received appropriate and nutritious food.

        The success of the food drive was celebrated with a community gathering where organizers thanked all participants and donors. The event also included a cooking demonstration on how to prepare healthy meals with donated items. The positive impact of the food drive underscores the importance of community involvement in addressing food insecurity and supporting vulnerable populations.",
        "images/melbourne_food_drive.jpg",
        2 -- Melbourne
    ),
    (
        0,
        "Adelaide Volunteers Assist in Building Community Center",
        "Blue Hope volunteers in Adelaide have played a crucial role in the construction of a new community center, which will serve as a hub for various social and recreational activities. The volunteers assisted with tasks such as painting, landscaping, and setting up facilities.

        The project began with a groundbreaking ceremony attended by local officials and community members. Volunteers worked alongside professional builders, contributing their time and skills to tasks such as painting walls, installing flooring, and landscaping the surrounding area.

        The new community center will offer programs for all age groups, including fitness classes, art workshops, and support groups. This project exemplifies the power of volunteerism in creating spaces that bring people together and enhance community well-being. The center will feature a gym, a multi-purpose hall, meeting rooms, and outdoor recreational spaces.

        Volunteers also helped to set up furniture, equipment, and facilities needed for the center’s operations. Local businesses donated materials and supplies, further supporting the construction efforts. The community center will provide a venue for various activities and events, fostering social interaction and engagement among residents.

        Once completed, the center will offer programs for all age groups, including fitness classes, art workshops, and support groups. The project exemplifies the power of volunteerism in creating spaces that bring people together and enhance community well-being. The center will also host community meetings, cultural events, and educational workshops, serving as a vital resource for the community.

        The project received widespread support from the community, with many expressing their excitement and anticipation for the new center. The volunteers' dedication and hard work have been instrumental in bringing this project to fruition. The opening ceremony is scheduled for next month, where the community will celebrate the successful completion of the center and the positive impact it will have on the neighborhood.",
        "images/community_center.jpg",
        1 -- Adelaide
    ),
    (
        0,
        "Sydney Food Festival Celebrates Culinary Diversity",
        "The Sydney Food Festival celebrated culinary diversity with food stalls offering dishes from around the world. The event also included cooking demonstrations and live entertainment, attracting food enthusiasts from across the city.

        Held at a central park, the festival featured dozens of food stalls run by local restaurants and food vendors, each showcasing their signature dishes. Attendees had the opportunity to sample a variety of cuisines, including Asian, Mediterranean, Latin American, and Middle Eastern.

        The event also included cooking demonstrations where renowned chefs prepared their favorite recipes on stage, sharing cooking tips and techniques with the audience. These demonstrations were interactive, with attendees invited to ask questions and taste the dishes.

        Live entertainment added to the festive atmosphere, with performances by local musicians, dancers, and cultural groups. The entertainment lineup featured a mix of traditional and contemporary acts, reflecting the city's vibrant cultural scene.

        The festival aimed to promote cultural exchange and appreciation through food, bringing people together in a festive and inclusive environment. Workshops on food-related topics, such as sustainable cooking practices and nutrition, were also held, providing educational value to the event.

        Food enthusiasts from all over Sydney gathered to enjoy the diverse culinary offerings, making the festival a major success. The event provided a platform for local food businesses to showcase their talents and for attendees to explore new flavors and cuisines.

        The success of the festival highlights the rich culinary heritage of Sydney and the community’s love for good food and shared experiences. The organizers received positive feedback from both vendors and attendees, with many expressing their excitement for future editions of the festival. The event concluded with a grand finale performance and a fireworks display, leaving everyone looking forward to the next celebration of culinary diversity.",
        "images/sydney_food_festival.jpg",
        3 -- Sydney
    ),
    (
        0,
        "Melbourne Blood Drive Saves Lives",
        "The recent blood drive organized by Blue Hope in Melbourne saw a record turnout, with hundreds of donors coming forward to give blood. The event has helped save countless lives and raised awareness about the importance of blood donation.

        Held at a central location, the blood drive was supported by local hospitals and medical professionals who volunteered their time to assist with the donations. The event included comprehensive health checks for donors, ensuring they were eligible to donate.

        Donors were provided with information about the donation process and the critical need for blood in hospitals and emergency services. The blood drive also included health checks and refreshments for participants. Donors were given light snacks and drinks to help them recover after their donation, and volunteers were on hand to ensure everyone was comfortable.

        The overwhelming response from the community highlights the spirit of generosity and the willingness to help others in times of need. Local businesses and organizations also contributed by providing supplies and promotional support, helping to spread the word about the blood drive.

        Throughout the day, the donation center was filled with a steady stream of donors, all eager to contribute to this life-saving cause. The event also featured educational booths where attendees could learn more about the benefits of blood donation and how it saves lives.

        The success of the blood drive was celebrated with a closing ceremony where organizers thanked all the donors and volunteers for their contributions. The event demonstrated the power of community action in supporting critical health needs. Plans are already underway for future blood drives, with the goal of making them regular events to ensure a steady supply of blood for those in need.",
        "images/blood_drive.jpg",
        2 -- Melbourne
    ),
    (
        0,
        "Adelaide Hosts Successful Charity Gala in Adelaide",
        "The recent Charity Gala hosted by Blue Hope in Adelaide was a resounding success, raising over $100,000 to support various community initiatives. The event featured performances by local artists, auctions of donated items, and speeches from notable community leaders.

        The gala took place in an elegantly decorated venue, with guests dressed in their finest attire. The evening began with a welcome reception, where attendees had the opportunity to mingle and enjoy refreshments.

        The event featured performances by local artists, including musicians, dancers, and comedians, providing entertainment throughout the night. The highlight of the evening was the live auction, where attendees bid on a range of donated items, from luxury goods to unique experiences. The auction was conducted by a professional auctioneer, creating an exciting and competitive atmosphere.

        Attendees enjoyed a night of entertainment and networking, all while supporting a worthy cause. The funds raised will be used to expand our outreach programs, support new projects, and provide resources to those in need. The gala was a testament to the community's generosity and the collective effort to make a positive impact.

        The gala also included a silent auction, where guests could place bids on items displayed around the venue. The variety of auction items ensured there was something for everyone, and the competitive bidding helped raise substantial funds for Blue Hope's initiatives.

        Throughout the evening, speeches from notable community leaders highlighted the importance of the work done by Blue Hope and the impact of community support. The event concluded with a thank-you speech from the organizers, expressing gratitude to all attendees, sponsors, and volunteers who contributed to the success of the gala.

        The Charity Gala was not only a fundraising event but also an opportunity to celebrate the achievements of Blue Hope and its volunteers. The positive feedback from attendees indicates a strong interest in making the gala an annual event, continuing to support and expand the organization's efforts in the community.",
        "images/charity_gala.jpg",
        1 -- Adelaide
    ),
    (
        0,
        "Melbourne Tech Fair Showcases Innovation and Creativity",
        "The Melbourne Tech Fair showcased the latest innovations in technology and creativity. Attendees explored new gadgets, participated in workshops, and met industry leaders.

        Held at the Melbourne Convention Center, the tech fair attracted thousands of visitors over the course of three days. The fair featured exhibits from tech companies, startups, and research institutions, highlighting advancements in fields such as artificial intelligence, robotics, and renewable energy.

        The exhibition hall was filled with interactive displays and demonstrations, allowing attendees to get hands-on experience with the latest technologies. Companies showcased their products and services, offering live demonstrations and answering questions from curious visitors.

        Workshops provided hands-on experiences, allowing participants to learn about coding, 3D printing, and other tech skills. These workshops were led by industry experts and covered a range of topics, from beginner to advanced levels. Participants had the opportunity to build their own projects, gaining practical knowledge and skills.

        The event also included panel discussions with experts discussing the future of technology and its impact on society. These discussions covered various topics, including the ethical implications of AI, the potential of renewable energy, and the future of smart cities. Attendees could engage with the speakers during Q&A sessions, fostering a dynamic exchange of ideas.

        Networking sessions were also a key feature of the tech fair, providing opportunities for attendees to connect with industry professionals, investors, and fellow tech enthusiasts. These sessions facilitated valuable connections and collaborations, furthering innovation and growth in the tech sector.

        The Tech Fair was a celebration of innovation and a platform for sharing knowledge and inspiration. It provided a unique opportunity for tech enthusiasts, professionals, and the general public to explore the latest trends and developments in technology. The success of the fair highlights Melbourne's position as a hub for innovation and creativity, encouraging further advancements in the tech industry.",
        "images/tech_fair.jpg",
        2 -- Melbourne
    ),
    (
        0,
        "Sydney Hosts Successful Coastal Cleanup",
        "Blue Hope's coastal cleanup event in Sydney was a huge success, with volunteers removing tons of trash from the beaches. The event highlighted the importance of environmental conservation.

        Volunteers gathered early in the morning at various beaches along the Sydney coastline. Equipped with gloves, trash bags, and litter pickers, they spread out to cover miles of shoreline. The cleanup effort focused on removing plastic waste, fishing nets, and other debris that pose a threat to marine life.

        The event not only improved the appearance of the beaches but also protected marine life from harmful waste. The event included educational sessions on the impacts of plastic pollution and ways to reduce waste. Environmental experts provided information on the harmful effects of plastic on marine ecosystems and offered tips on how to reduce plastic usage in daily life.

        The strong turnout and community support underscored the shared responsibility in protecting our natural environment. Participants of all ages joined the effort, from school groups to local businesses, demonstrating the widespread commitment to environmental conservation.

        Throughout the day, volunteers collected and sorted the trash, ensuring that recyclable materials were properly processed. The cleanup effort not only beautified the beaches but also raised awareness about the importance of keeping our coastal areas clean.

        The event concluded with a community gathering where participants shared their experiences and discussed future conservation initiatives. Refreshments were provided, and local musicians performed, creating a festive and rewarding atmosphere. The success of the coastal cleanup highlights the power of community action in addressing environmental challenges and protecting our natural heritage.",
        "images/coastal_cleanup.jpg",
        3 -- Sydney
    ),
    (
        0,
        "Sydney Hosts Free Health Clinic for Low-Income Families",
        "Blue Hope organized a free health clinic in Sydney for low-income families, offering medical checkups, vaccinations, and health advice. The event was well-attended and greatly appreciated by the community.

        Held at a local community center, the health clinic provided a range of medical services to individuals and families who might not otherwise have access to healthcare. Medical professionals volunteered their time and expertise to conduct comprehensive health screenings, including blood pressure checks, cholesterol tests, and diabetes screenings.

        Attendees received comprehensive health screenings, dental checkups, and access to health education resources. The clinic also provided information on healthy living practices and preventative care. Dental professionals offered free checkups and basic dental care, helping to address an often-overlooked aspect of health.

        The event included educational workshops on topics such as nutrition, exercise, and mental health. These workshops aimed to empower attendees with knowledge and practical tips to improve their overall well-being. Health educators provided resources and answered questions, ensuring that attendees left with a better understanding of how to maintain their health.

        The success of the event underscores the importance of accessible healthcare and the role of community organizations in addressing health disparities. Local businesses and organizations supported the clinic by donating supplies and promoting the event, helping to ensure a strong turnout.

        Attendees expressed their gratitude for the services provided, with many highlighting the positive impact on their health and well-being. The clinic also served as a platform for connecting individuals with ongoing healthcare resources and support services.

        The event concluded with a thank-you ceremony where organizers expressed their appreciation to all the volunteers and participants. The overwhelming response and positive feedback highlight the need for such initiatives and the role they play in supporting vulnerable populations. Plans are already in place to hold similar health clinics in the future, further extending the reach of these vital services.",
        "images/health_clinic.jpg",
        3 -- Sydney
    ),
    (
        0,
        "Melbourne Hosts Annual Charity Gala",
        "The annual charity gala hosted in Melbourne successfully raised over $200,000 to support various community initiatives. The event featured performances, auctions, and speeches from notable community leaders.

        Held in a grand ballroom, the gala was a black-tie event that drew a large crowd of philanthropists, business leaders, and community supporters. The evening began with a cocktail reception, where guests had the opportunity to socialize and enjoy hors d'oeuvres.

        The event featured performances by local artists, including musicians, dancers, and comedians, providing entertainment throughout the night. The highlight of the evening was the live auction, where attendees bid on a range of donated items, from luxury goods to unique experiences. The auction was conducted by a professional auctioneer, creating an exciting and competitive atmosphere.

        Attendees enjoyed a night of fine dining, entertainment, and networking, all while contributing to a meaningful cause. The funds raised will support programs that provide education, health services, and emergency aid to those in need. The gala showcased the power of community support and the collective effort to improve the lives of others.

        The gala also included a silent auction, where guests could place bids on items displayed around the venue. The variety of auction items ensured there was something for everyone, and the competitive bidding helped raise substantial funds for Blue Hope's initiatives.

        Throughout the evening, speeches from notable community leaders highlighted the importance of the work done by Blue Hope and the impact of community support. The event concluded with a thank-you speech from the organizers, expressing gratitude to all attendees, sponsors, and volunteers who contributed to the success of the gala.

        The Charity Gala was not only a fundraising event but also an opportunity to celebrate the achievements of Blue Hope and its volunteers. The positive feedback from attendees indicates a strong interest in making the gala an annual event, continuing to support and expand the organization's efforts in the community.",
        "images/melbourne_gala.jpg",
        2 -- Melbourne
    ),
    (
        1,
        "Sydney Running competition for Local Charities",
        "The Sydney Charity Run was a great success, raising significant funds for local charities. Participants enjoyed the scenic route along Sydney Harbour and celebrated with a post-race event featuring food and music.

        The event kicked off early in the morning with a warm-up session led by fitness instructors, energizing participants for the run. The scenic route took runners along Sydney Harbour, offering breathtaking views and a refreshing environment.

        Runners of all ages and abilities participated, contributing to a fun and inclusive atmosphere. The event also included a kids’ fun run, encouraging young participants to get involved in charitable activities. The kids’ run featured shorter distances and fun activities, making it a family-friendly event.

        The funds raised will support a range of initiatives, including healthcare, education, and social services. The charity run demonstrated the community’s commitment to supporting local causes and making a positive impact. Local businesses and organizations sponsored the event, providing support and promoting participation.

        The post-race celebration featured live music, food stalls, and award ceremonies for top finishers in various categories. Participants and spectators enjoyed a festive atmosphere, with plenty of activities for all ages. The event also included health and wellness booths, providing information on maintaining a healthy lifestyle.

        The charity run concluded with an awards ceremony where medals and prizes were given to top finishers. The event highlighted the community’s spirit of generosity and the power of collective action in supporting important causes. The success of the run has set the stage for future events, with organizers planning to make it an annual tradition.",
        "images/sydney_charity_run.jpg",
        3 -- Sydney
    );