import React from 'react';
import { Text } from 'react-native';
export default ({children, style, ...rest}) => <Text {...rest} style={[{fontFamily: 'Montserrat_400Regular'} ,style]}>{children}</Text>
