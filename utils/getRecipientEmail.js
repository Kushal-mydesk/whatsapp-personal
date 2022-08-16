const getRecipientEmail = (users, userLoggedIn) => 
    //const userArr = Object.values(users);
   // console.log(users);
    //console.log(userLoggedIn);
    //console.log(userArr);
    users?.filter((userToFilter) => userToFilter !== userLoggedIn?.email)[0];


export default  getRecipientEmail;