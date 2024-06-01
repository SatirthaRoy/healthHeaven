import React from "react";
import SectionTitle from "../../../Shared components/SectionTitle";

const Whychoose = () => {
  return (
    <div className="mt-24 space-y-10 p-4 bg-theme bg-opacity-10 rounded-3xl">
      <SectionTitle title="Why Us?" />
      <div className="stats stats-vertical bg-theme bg-opacity-20 lg:stats-horizontal w-full">
        <div className="stat">
          <div className="stat-title">Products</div>
          <div className="stat-value text-6xl">31K</div>
        </div>

        <div className="stat">
          <div className="stat-title">Users</div>
          <div className="stat-value text-6xl">4,200</div>
        </div>

        <div className="stat">
          <div className="stat-title">New Registers</div>
          <div className="stat-value text-6xl">1,200</div>
        </div>
      </div>
    </div>
  );
};

export default Whychoose;
