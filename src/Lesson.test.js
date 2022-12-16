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
      import { rolesDataSource } from "./Source";

      it("using direct to viewmodel", async () => {
        // step 1 - hydrating the programmers model
        const usersPm = [];
        const rolesPm = [];

        rolesDataSource.forEach((role) => {
          role.people.forEach((person) => {
            // console.log(person);
            let hasPerson = usersPm.find((userPm) => {
              return person.name === userPm.userName;
            });
            if (!hasPerson) {
              usersPm.push({ userName: person.name, roles: [role.roleName] });
            } else {
              hasPerson.roles.push(role.roleName);
            }
          });
          rolesPm.push(role.roleName);
        });

        // step 2 - hydrating the ViewModel for users display
        let usersDisplayViewModel = [];
        let inActiveUserPermissionsCount = 0;
        usersPm.forEach((user) => {
          let stringToAdd = `The user ${user.userName} is a ${user.roles
            .map((role) => {
              return role;
            })
            .join(" and ")} but not ${rolesPm
            .filter((role) => {
              if (user.roles.includes(role)) {
                return false;
              } else {
                inActiveUserPermissionsCount++;
                return true;
              }
            })
            .join(" and ")}`;
          usersDisplayViewModel.push(stringToAdd);
        });

        expect(usersDisplayViewModel).toEqual([
          "The user rob is a Admin and Teacher but not Student",
          "The user alex is a Admin but not Teacher and Student",
          "The user simon is a Teacher and Student but not Admin",
          "The user jane is a Teacher and Student but not Admin",
        ]);
        // step 3 - hydrating the ViewModel for stats display

        let statsViewModel = {
          userCount: null,
          activeUserPermissionsCount: null,
        };

        statsViewModel.userCount = usersPm.length;

        let activeUserPermissionsCount = 0;
        usersPm.forEach((user) => {
          activeUserPermissionsCount =
            activeUserPermissionsCount + user.roles.length;
        });

        statsViewModel.activeUserPermissionsCount = activeUserPermissionsCount;
        statsViewModel.inActiveUserPermissionsCount =
          inActiveUserPermissionsCount;

        expect(statsViewModel).toEqual({
          userCount: 4,
          activeUserPermissionsCount: 7,
          inActiveUserPermissionsCount: 5,
        });
      });
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
