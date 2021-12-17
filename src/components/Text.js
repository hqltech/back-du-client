import React from 'react';
import { Text } from 'react-native';
export default ({children, style, ...rest}) => <Text {...rest} style={[style]}>{children}</Text>
