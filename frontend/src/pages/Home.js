import React from 'react'
import CategoryList from '../components/CategoryList';
import BannerProduct from '../components/BannerProduct';
// import HorizontalCardProduct from '../components/HorizontalCardProduct';
// import VarticalCardProduct from '../components/VarticalCardProduct';

const Home = () => {
  return (
    <div>
      <CategoryList />
      <BannerProduct />

      {/* <HorizontalCardProduct category="" heading="Top's Airpodes" /> */}

      {/* <VarticalCardProduct category="mobile" heading="Mobile" /> */}
    </div>
  )
}

export default Home;