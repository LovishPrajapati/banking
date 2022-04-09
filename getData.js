const axios = require("axios");
const customer = require("./models/customerModel");

const populateDate = () => {
  axios
    .get("https://randomuser.me/api/?results=10")
    .then(({ data }) => {
      const dArr = [];
      data?.results?.forEach((user) => {
        const userObj = {
          name: user?.name?.first + " " + user?.name?.last,
          dob: user?.dob?.date,
          gender: user?.gender,
          address:
            user?.location?.street?.number +
            " " +
            user?.location?.street?.name +
            " " +
            user?.location?.city +
            " " +
            user?.location?.state +
            " " +
            user?.location?.country,
          email: user?.email,
          phone: user?.phone,
          imgUrl: user?.picture?.medium,
        };

        dArr.push(userObj);
      });

      customer
        .insertMany(dArr)
        .then(() => console.log("Saved"))
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
};

populateDate();
