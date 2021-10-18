
const getMenuFrontend = (role = 'USER_ROLE') => {
    
    const menu = [
        { 
        title: 'Dashboard', 
        icon: 'mdi mdi-gauge',
        subMenu: [
            {title: 'Main', url: '/'},
            {title: 'ProgressBar', url: 'progress'},
            {title: 'Graphics', url: 'grafica1'},
            {title: 'promesas', url: 'promesas'},
            {title: 'rxjs', url: 'rxjs'},
        ]
        },
        { 
        title: 'Mantenimiento', 
        icon: 'mdi mdi-folder-lock-open',
        subMenu: [
            // {title: 'Usuarios', url: 'usuarios'},
            {title: 'Hospitales', url: 'hospitales'},
            {title: 'Medicos', url: 'medicos'}
        ]
        }
  ]

  if( role === 'USER_ADMIN'){

    menu[1].subMenu.unshift({title: 'Usuarios', url: 'usuarios'})

  }

  return menu;

}

module.exports = {

    getMenuFrontend

}