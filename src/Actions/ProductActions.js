/* This is the action page for getting categories and departments 
  and sedning to the Redux store.

  The core functions are :
  1/ GetCategory which actually do the dispatch to the store directly

  The async Fuctions are :(They basically communicate with the Api and then dispatch 'GetCategory' )

  1/ StartGetCategory performs two server calls one to https://backendapi.turing.com/departments to get the departments,
  using the data collected it makes another call to 'https://backendapi.turing.com/categories/inDepartment/${department.department_id}'
  to get the categories.
*/

import axios from "axios";


const GetCategory = (category = {}) => ({
  type: "GetCategory",
  category
});

export const StartGetCategory = (page, limit) => {
  return dispatch => {
    return axios
      .get("https://backendapi.turing.com/departments")
      .then(function({ data }) {
        data.forEach(department => {
         
          axios
            .get(
              `https://backendapi.turing.com/categories/inDepartment/${
                department.department_id
              }`
            )
            .then(({ data }) => {
              const departmentAndcategory = {
                id: department.department_id,
                department_name: department.name,
                categories: data
              };

              dispatch(GetCategory(departmentAndcategory));
            })
            .catch(erorr => {
              throw erorr;
            });
        });
      })
      .catch(erorr => {
        throw erorr;
      });
  };
};
