export const adminMenu = [
  {
    //quản lý người dùng
    name: "menu.admin.manage-user",
    menus: [
      {
        name: "menu.admin.crud",
        link: "/system/user-manage",
      },
      {
        name: "menu.admin.crudredux",
        link: "/system/user-redux",
      },
      {
        name: "menu.admin.manage-teacher",
        link: "/system/manage-teacher",
        // subMenus: [
        //     { name: 'menu.system.system-administrator.user-manage', link: '/system/user-manage' },
        //     { name: 'menu.system.system-administrator.user-redux', link: '/system/user-redux' },
        // ]
      },
      {
        //quản lý ke haoch kham benh bac si

        name: "menu.teacher.manage-schedule",
        link: "/teacher/manage-schedule",
      },
    ],
  },
  {
    //quản lý phòng khám
    name: "menu.admin.manage-classes",
    menus: [
      {
        name: "menu.admin.manage-classes",
        link: "/system/manage-classes",
      },
    ],
  },
  {
    //quản lý chuyên khoa
    name: "menu.admin.manage-courses",
    menus: [
      {
        name: "menu.admin.manage-courses",
        link: "/system/manage-courses",
      },
    ],
  },
  // {
  //   //quản lý Cẩm nang
  //   name: "menu.admin.handbook",
  //   menus: [
  //     {
  //       name: "menu.admin.handbook",
  //       link: "/system/handbook",
  //     },
  //   ],
  // },
];
export const doctorMenu = [
  {
    name: "menu.admin.manage-user",
    menus: [
      {
        //quan ly ke hoach kham benh cua bac si
        name: "menu.teacher.manage-schedule",
        link: "/teacher/manage-schedule",
      },
      {
        //quan ly benh nhan kham benh cua bac si
        name: "menu.teacher.manage-student",
        link: "/teacher/manage-student",
      },
    ],
  },
];
