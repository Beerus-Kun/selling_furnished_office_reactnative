module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      'react-native-reanimated/plugin',
      // [
      //   "@stripe/stripe-react-native",
      //   {
      //     // "merchantIdentifier": string | string[],
      //     "enableGooglePay": false
      //   }
      // ]
    ]
  };
};
