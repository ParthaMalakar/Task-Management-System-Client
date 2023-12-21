// Include this in your landing page component

import React from 'react';

const UserBenefitsSection = () => {
  const userCategories = [
    {
      icon: 'https://i.ibb.co/nz1xbTr/rear-view-programmer-working-all-night-long.jpg',
      title: 'Developers',
      description: 'Effortlessly manage coding tasks, sprints, and project timelines.',
    },
    {
      icon: 'https://i.ibb.co/nCJxpzC/group-three-modern-architects.jpg',
      title: 'Corporate Professionals',
      description: 'Enhance collaboration, track project progress, and meet deadlines seamlessly.',
    },
    {
      icon: 'https://i.ibb.co/chDSGBm/medium-shot-smiley-man-sitting-desk.jpg',
      title: 'Bankers',
      description: 'Organize financial tasks, streamline project management, and boost team efficiency.',
    },
    // Add more user categories as needed
  ];

  return (
    <section className="user-benefits-section max-w-6xl mx-auto mb-4">
      <h2 className='text-center mt-9 font-bold text-3xl'>Who Can Benefit from TaskFlow Pro?</h2>
      <div className="user-categories grid grid-cols-1 md:grid-cols-3 gap-7 mt-8">
        {userCategories.map((category, index) => (
        //   <div key={index} className="user-category">
        //     <span className="category-icon">{category.icon}</span>
        //     <h3>{category.title}</h3>
        //     <p>{category.description}</p>
        //   </div>
        <div key={index} className="card w-96 bg-base-100 shadow-xl">
  <figure><img src={category.icon} alt="Shoes" /></figure>
  <div className="card-body">
    <h2 className="card-title">{category.title}</h2>
    <p>{category.description}</p>
    
  </div>
</div>
        ))}
      </div>
    </section>
  );
};

export default UserBenefitsSection;
