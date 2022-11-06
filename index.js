const logo = require('asciiart-logo');
// asciiart logo information
const logoText = {
        name: 'Employee Tracker',
        lineChars: 10,
        padding: 2,
        margin: 3,
        borderColor: 'grey',
        logoColor: 'burnt-orange',
}


init = () => {
    console.log(logo(logoText).render());
}

init();