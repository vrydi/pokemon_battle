//https://pogoapi.net/api/v1/type_effectiveness.json

export async function fetchDataTypeEffectiveness() {
    let result = undefined
    try {
        console.log('fetching chart')
        const response = await fetch('https://pogoapi.net/api/v1/type_effectiveness.json');
        // console.log({response});
        if (response.ok) {
            result = await response.json();
            console.log('fetching succeeded')
        } else {
            const responseBody = await response.json();
            console.error(`ERROR: ${response.status} - ${responseBody.error} - ${responseBody.message} `);
            const errorMessage = responseBody.errors &&
                responseBody.errors.reduce((accumulator, error) => `${accumulator} ${error.defaultMessage}  --- `, "--- ");
            console.log(`   ${JSON.stringify(responseBody)}`);
            console.log(`   ${errorMessage}`);
        }
    } catch (e) {
        console.error(`ERROR: ${e}`);
        console.error("Connection error");
    }
    return result
}