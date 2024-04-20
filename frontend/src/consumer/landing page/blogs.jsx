// Blogs.jsx
import React, { useState } from 'react';
import './blogs.css';
import organicImage from './farmers/organiceat.jpeg'
import supportImage from './farmers/support.jpeg'
import freshImage from './farmers/fresh.jpg'
import artImage from './farmers/art.jpg'


const blogPostsData = [
  {
    id: 1,
    title: 'The Benefits of Organic Eating',
    content:
      "In today's fast-paced world, the importance of organic eating cannot be overstated. Organic food is not only free from harmful pesticides and chemicals, but it also offers a plethora of health benefits. By choosing organic, you're not only nourishing your body with wholesome nutrients but also supporting sustainable farming practices that prioritize the well-being of the environment and future generations.\n\nOne of the key advantages of organic eating is its impact on human health. Organic produce is grown without synthetic pesticides and fertilizers, which have been linked to various health issues such as cancer, hormonal imbalance, and neurodevelopmental disorders. By opting for organic fruits, vegetables, and grains, you reduce your exposure to these harmful chemicals, thereby safeguarding your health and well-being. By consuming organic foods, you're not only satisfying your hunger but also providing your body with the nutrients it needs to thrive.\n\nFurthermore, organic farming practices prioritize soil health and biodiversity, which are essential for the long-term sustainability of our food systems. Organic farmers use techniques such as crop rotation, composting, and natural pest control to nurture healthy soil ecosystems and minimize environmental impact. By supporting organic agriculture, you're contributing to the preservation of natural habitats, conservation of water resources, and reduction of greenhouse gas emissions.\n\nIn addition to its health and environmental benefits, organic eating also promotes ethical values such as animal welfare and fair labor practices. Organic livestock are raised in humane conditions, with access to outdoor space, natural diets, and proper veterinary care. Similarly, organic crop production emphasizes fair treatment of farmworkers, ensuring safe working conditions and fair wages.\n\nOverall, embracing organic eating is not just a lifestyle choice; it's a commitment to holistic health, environmental stewardship, and ethical values.",
    image: organicImage,
    date: '2024-04-05',
    author: 'Kurt Cobain',
  },
  {
    id: 2,
    title: 'Supporting Local Farmers: A Sustainable Choice',
    content:
      'Supporting local farmers is not just about buying fresh produce; it’s about fostering a sustainable food ecosystem. When you purchase directly from local farmers, you reduce food miles, support the local economy, and promote environmental sustainability. Local farmers often use organic and sustainable farming practices, which are beneficial for both consumers and the environment.\n\nBy choosing to support local farmers, you contribute to the preservation of farmland, biodiversity, and rural communities. You also get access to fresher and healthier food options, as local produce is often harvested at peak ripeness and doesn’t require long-distance transportation.\n\nMoreover, buying from local farmers allows you to build a connection with the source of your food. You can learn about farming practices, seasonal produce, and the effort that goes into growing high-quality food. It’s a way to appreciate the hard work of farmers and value the food we consume.\n\nIn a world where food systems are becoming increasingly globalized, supporting local farmers is a conscious choice that promotes sustainability, community resilience, and a closer relationship with the food we eat.',
    image: supportImage,
    date: '2024-04-10',
    author: 'Layne Stanely',
  },
  {
    id: 3,
    title: 'Fresh Groceries: The Key to Healthy Eating',
    content:
      'Fresh groceries are the cornerstone of a healthy diet. Incorporating a variety of fresh fruits, vegetables, and whole foods into your meals provides essential nutrients, vitamins, and minerals that support overall health and well-being.\n\nOne of the primary benefits of fresh groceries is their nutrient density. Fresh fruits and vegetables are rich in vitamins, antioxidants, and fiber, which are crucial for immune function, digestion, and disease prevention. By including a rainbow of colors in your diet, you ensure that you get a diverse range of nutrients that nourish your body.\n\nIn addition to nutrient content, fresh groceries offer superior flavor and taste compared to processed or preserved foods. They add vibrancy and freshness to your meals, making them more enjoyable and satisfying.\n\nMoreover, fresh groceries are often free from added preservatives, artificial colors, and unhealthy fats commonly found in packaged foods. Choosing fresh ingredients allows you to control the quality of your meals and avoid unnecessary additives.\n\nTo make the most of fresh groceries, it’s essential to shop seasonally and locally whenever possible. Seasonal produce is at its peak in terms of flavor and nutrition, and buying local supports regional farmers and reduces environmental impact.\n\nIncorporating fresh groceries into your daily meals is a simple yet powerful way to prioritize your health, support local agriculture, and enjoy delicious, wholesome food.',
    image: freshImage,
    date: '2024-04-15',
    author: 'Chris Cornell',
  },
  {
    id: 4,
    title: 'The Art of Sustainable Farming',
    content:
      'Sustainable farming is a holistic approach to agriculture that prioritizes environmental stewardship, social responsibility, and economic viability. It aims to meet the needs of the present without compromising the ability of future generations to meet their own needs.\n\nOne of the core principles of sustainable farming is soil health. Healthy soils are the foundation of productive agriculture, providing essential nutrients, water retention, and support for plant growth. Sustainable farmers use techniques such as cover cropping, crop rotation, and minimal tillage to improve soil health and fertility while reducing erosion and nutrient runoff.\n\nIn addition to soil management, sustainable farming emphasizes biodiversity and ecosystem health. By preserving natural habitats, planting native vegetation, and avoiding chemical inputs, farmers can create balanced ecosystems that support pollinators, beneficial insects, and wildlife.\n\nAnother key aspect of sustainable farming is water conservation and management. Farmers implement practices such as drip irrigation, rainwater harvesting, and water-efficient crop selection to minimize water usage and protect freshwater resources.\n\nFurthermore, sustainable farming promotes resilience to climate change by adopting adaptive strategies such as agroforestry, agroecology, and integrated pest management. These approaches reduce reliance on synthetic inputs, build natural resilience in crops, and mitigate the impact of extreme weather events.\n\nBy embracing sustainable farming practices, farmers can reduce their environmental footprint, enhance food security, and contribute to a more sustainable food system. Consumers can support sustainable agriculture by choosing products from certified organic farms, farmers markets, and community-supported agriculture (CSA) programs.\n\nTogether, we can cultivate a future where farming is not just about production but also about regeneration, conservation, and harmony with nature.',
    image: artImage,
    date: '2024-04-20',
    author: 'Tim Henson',
  }
];


export default function Blogs() {
  const [expandedId, setExpandedId] = useState(null);

  const handleReadMore = (postId) => {
    setExpandedId(postId === expandedId ? null : postId);
  };

  return (
    <div className="blogs-container" id='blog'>
      <h1 className="blogs-heading">Our Latest Blog Posts</h1>
      <div className="blogs-list">
        {blogPostsData.slice(0, 4).map((post) => (
          <div key={post.id} className={`blog-post ${expandedId === post.id ? 'expanded' : ''}`}>
            <img src={post.image} alt={post.title} className="post-image" />
            <h2 className="post-title">{post.title}</h2>
            <p className="post-content">{expandedId === post.id ? post.content : post.content.substring(0, 200)}...</p>
            <button className="read-more" onClick={() => handleReadMore(post.id)}>
              {expandedId === post.id ? 'Read Less' : 'Read More'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
