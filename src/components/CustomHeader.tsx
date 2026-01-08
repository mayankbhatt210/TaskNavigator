import React, { useContext } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Image,
  Alert,
  StatusBar,
  Platform,
} from 'react-native';
import { Colors, Images } from '../Theme';
import { AuthContext } from '../auth/AuthContext';

const HEADER_HEIGHT = 56;
const ANDROID_STATUSBAR = StatusBar.currentHeight || 0;

type CustomHeaderProps = {
  title: string;
  onBack?: () => void; // ✅ optional
  rightAction?: () => void; // ✅ optional
};
const CustomHeader: React.FC<CustomHeaderProps> = ({
  title,
  onBack,
  rightAction,
}) => {
  return (
    <SafeAreaView
      style={{
        backgroundColor: Colors.white,
      }}
    >
      <View
        style={{
          height: HEADER_HEIGHT,
          paddingTop: Platform.OS === 'android' ? ANDROID_STATUSBAR / 2 : 0,
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 16,
          backgroundColor: Colors.themeColor,
        }}
      >
        {onBack ? (
          <TouchableOpacity onPress={onBack} style={{ marginTop: 0 }}>
            <Image
              source={Images.backIcon}
              style={{ height: 22, width: 22 }}
              resizeMode="cover"
            />
          </TouchableOpacity>
        ) : (
          <View style={{ width: 24 }} />
        )}
        <Text
          style={{
            flex: 1,
            textAlign: 'center',
            fontSize: 18,
            fontWeight: '600',
            color: Colors.white,
          }}
        >
          {title}
        </Text>
        {rightAction ? (
          <TouchableOpacity onPress={rightAction}>
            <Image
              source={Images.logoutIcon}
              style={{ height: 22, width: 22 }}
              resizeMode="contain"
            />
          </TouchableOpacity>
        ) : (
          <View style={{ width: 24 }} />
        )}
      </View>
    </SafeAreaView>
  );
};
export default CustomHeader;
