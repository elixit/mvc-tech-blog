// module for date exported for date of user's upload
module.exports = { 
    format_date: date => {
        return `${date.getMonth()+1}/${date.getDate()}/${date.getFullYear()}`;
    }
}