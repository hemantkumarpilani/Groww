import {FC, ReactNode} from 'react';
import {SafeAreaView, StyleSheet, View, ViewStyle} from 'react-native';

interface CustomSafeAreaViewProps {
  children: ReactNode;
}

const CustomSafeAreaView: FC<CustomSafeAreaViewProps> = ({children}) => {
  return (
    <SafeAreaView>
      <View style={styles.container}>{children}</View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  } as ViewStyle,
});

export default CustomSafeAreaView
