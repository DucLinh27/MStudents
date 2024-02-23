export const adminMenu = [
  {
    //quản lý người dùng
    name: "menu.admin.manage-user",
    menus: [
      {
        name: "menu.admin.crud",
        link: "/system/user-manage",
      },
    ],
  },
  {
    //quản lý teacher
    name: "menu.admin.manage-teacher",
    menus: [
      {
        name: "menu.admin.manage-teacher",
        link: "/system/user-redux",
      },
    ],
  },

  {
    //quản lý courses
    name: "menu.admin.manage-courses",
    menus: [
      {
        name: "menu.admin.manage-courses",
        link: "/system/manage-courses",
      },
      {
        name: "menu.admin.manage-videos",
        link: "/system/manage-videos",
      },
    ],
  },
  {
    //quản lý order
    name: "menu.admin.manage-order",
    menus: [
      {
        name: "menu.admin.manage-order",
        link: "/system/manage-order",
      },
    ],
  },
];
export const teacherMenu = [
  {
    name: "menu.admin.manage-user",
    menus: [
      // {
      //   // Manage  student
      //   name: "menu.teacher.manage-student",
      //   link: "/teacher/manage-student",
      // },
      {
        name: "menu.admin.crud",
        link: "/system/student-manage",
      },
      {
        name: "menu.admin.crudredux",
        link: "/system/user-redux",
      },
    ],
  },
  {
    //quản lý courses
    name: "menu.admin.manage-courses",
    menus: [
      {
        name: "menu.admin.manage-courses",
        link: "/system/manage-courses",
      },
      {
        name: "menu.admin.manage-videos",
        link: "/system/manage-videos",
      },
    ],
  },
];
