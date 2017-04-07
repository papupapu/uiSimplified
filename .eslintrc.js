module.exports = {
    "extends": "airbnb",
	"globals": {
		"window": true,
        "navigator": true,
		"document":true
	},
    "rules": {
        "no-param-reassign": [2, { 
            "props": false
        }]
    },
    "plugins": [
        "react",
        "jsx-a11y",
        "import"
    ]
};