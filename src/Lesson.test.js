import { rolesDataSource } from "./Source";

it("using direct to viewmodel", async () => {
  // step 1 - hydrating the programmers model
  const usersPm = [];

  rolesDataSource.forEach((role) => {
    role.people.forEach((person) => {
      // console.log(person);
      let hasPerson = usersPm.find((userName) => {
        return person.name === userName;
      });
      if (!hasPerson) {
        usersPm.push(person.name);
      }
    });
  });

  let usersDisplayViewModel = [];
  console.log(usersPm);
  console.log(usersDisplayViewModel);
  // step 2 - hydrating the ViewModel for users display
  // expect(usersDisplayViewModel).toEqual([
  //   "The user rob is a Admin and Teacher",
  //   "The user alex is a Admin",
  //   "The user simon is a Teacher and Student",
  //   "The user jane is a Teacher and Student"
  // ]);
  // step 3 - hydrating the ViewModel for stats display
  // expect(statsViewModel).toEqual({
  //   userCount: 4,
  //   activeUserPermissionsCount: 7
  // });
});
