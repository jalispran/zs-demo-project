const fs 		= require('fs');
const jwt 		= require('jsonwebtoken');
// http://travistidwell.com/blog/2013/09/06/an-online-rsa-public-and-private-key-generator/
// use 'utf8' to get string instead of byte array  (1024 bit key)
var privateKEY 	= fs.readFileSync('./jwt-module/private.key', 'utf8'); // to sign JWT
var publicKEY 	= fs.readFileSync('./jwt-module/public.key', 'utf8'); 	// to verify JWT

module.exports = {
	sign: (payload, $Options) => {
		/*
			sOptions = {
				issuer: "Authorizaxtion/Resource/This server",
				subject: "iam@user.me", 
				audience: "Client_Identity" // this should be provided by client
			}
		*/

		// Token signing options
		var signOptions = {
			issuer: 	$Options.issuer,
			subject: 	$Options.subject,
			audience: 	$Options.audience,
			expiresIn: 	"30d",				// 30 days validity
			algorithm: 	"RS256" 			// RSASSA options[ "RS256", "RS384", "RS512" ]
		};
		return jwt.sign(payload, privateKEY, signOptions);
	},

	verify: (token, $Option) => {
		/*
			vOption = {
				issuer: "Authorization/Resource/This server",
				subject: "iam@user.me", 
				audience: "Client_Identity" // this should be provided by client
			}		
		*/
		var verifyOptions = {
			issuer: 	$Option.issuer,
			subject: 	$Option.subject,
			audience: 	$Option.audience,
			expiresIn: 	"30d",
			algorithm: 	["RS256"]
		};
		try {
			return jwt.verify(token, publicKEY, verifyOptions);
		}catch(err){
			return false;
		}
	}, 

	decode: (token) => {
		return jwt.decode(token, {complete: true});
	}
}

/*
{
  "aud": [
    "GAP-Resource",
    "CLEO-Resource"
  ],
  "user_name": "915555555555",
  "scope": [
    "read",
    "write"
  ],
  "exp": 1541548315,
  "authorities": [
    "MA",
    "ROLE_OWNER"
  ],
  "jti": "94868828-f866-4639-9182-71a6deb0f50e",
  "client_id": "testjwtclientid"
}
*/