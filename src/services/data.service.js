import demoData from "../data/salesData";

const dataService = {
  getData: () => {
    return new Promise((resolve, reject) => {
      resolve(demoData);
    });
  },
};

export default dataService;
