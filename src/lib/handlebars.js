const {format} = require('timeago.js')


const helpers = {};

helpers.timeago = (timestamp)=>{
    return format(timestamp);
};

helpers.compare = (conditional, optional)=>{
    if(conditional.rolesId == 1){
        return optional.fn(this);
    }
}
module.exports = helpers;