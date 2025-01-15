import React, { useState } from "react";

const RandomJobPicker = () => {
  const [selectedJob, setSelectedJob] = useState("");
  const jobs = ["히어로", "팔라딘", "다크나이트"]; // 직업 데이터

  const pickRandomJob = () => {
    const randomIndex = Math.floor(Math.random() * jobs.length);
    setSelectedJob(jobs[randomIndex]);
  };

  return (
    <div>
      <h2>랜덤 직업 뽑기</h2>
      <button onClick={pickRandomJob}>직업 선택</button>
      {selectedJob && <p>선택된 직업: {selectedJob}</p>}
    </div>
  );
};

export default RandomJobPicker;
