import { Auth } from 'aws-amplify';

const checkUser = async (updateUser) => {

    try {
        const userData = await Auth.currentSession()

        if (!userData) {
            console.log('userData: ', userData);
            updateUser({});
            return;
        }

        console.log(userData);

        // Complex nested property destructuring
        const { idToken: { payload }} = userData;
        
        //Use JS property indexer operator, similar to array index operator
        //
        // The && is a boolean short circuit technique
        //
        // includes() is an array method like map(), filter(), reduce()
        const isAuthorized =
            payload['cognito:groups'] 
            && payload['cognito:groups'].includes('Admin')
            
            updateUser({
        username: payload['cognito:username'],
        isAuthorized
        })
    }

    catch (err) {
        console.log(err);
    }
}

export default checkUser