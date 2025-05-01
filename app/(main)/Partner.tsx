import React from 'react';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';


// You can import your SVG content here as a string (manually converted from an SVG file)
const PartnerSVG = require('../../assets/undraw/partner.svg').default; // Adjust the path as necessary

const Partner = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FFFDF7' }}>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <PartnerSVG
          width="100%"
          height="100%"
          preserveAspectRatio="xMidYMid meet"
          style={{ maxWidth: '85%', maxHeight: '60%' }} // Adjust size as needed
        />
        <View>
          <View style={{ marginTop: 20, alignItems: 'center', backgroundColor: '#5BA6AE', padding: 10 , borderRadius: 10}}>
            <Text style={{ fontSize: 24, fontFamily: 'TT Commons', color: '#eeeeee' }}>
              Share Serein with your friends
            </Text>
          </View>
          <View style={{ marginTop: 20, alignItems: 'center', backgroundColor: '#A27AFE', padding: 10 , borderRadius: 10}}>
            <Text style={{ fontSize: 24, fontFamily: 'TT Commons', color: '#eeeeee' }}>
              Share Serein with your Therapist
            </Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Partner;
