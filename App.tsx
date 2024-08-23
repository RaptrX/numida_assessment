import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'
import React from 'react'
import { baseURL } from './src/constants/env'
import AvailableLoans from './src/screens/AvailableLoans'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native'
import ApplicationForm from './src/screens/ApplicationForm'
import ExistingApplications from './src/screens/ExistingApplications'
import { Image } from 'react-native'
import { primary, secondary, white } from './src/constants/colours'
import { scale } from './src/constants/dimensions'

const client = new ApolloClient({
  uri: baseURL + '/graphql',
  cache: new InMemoryCache(),
})

const Tab = createBottomTabNavigator()

const getTabIcon = (screen: string) => {
  switch (screen) {
    case "Products":
      return require('./src/assets/store.png')
    case "Apply":
      return require('./src/assets/form.png')
    case "Applications":
      return require('./src/assets/account.png')
  }
}

function App(): React.JSX.Element {

  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            headerStyle: { backgroundColor: primary },
            headerTintColor: white,
            tabBarStyle: {
              backgroundColor: primary,
              borderTopWidth: 0,
            },
            tabBarIcon: ({ focused, color, size }) => {
              return <Image
                source={getTabIcon(route.name)}
                tintColor={focused ? secondary : white}
                style={{ width: scale(24), height: scale(24) }}
              />
            },
            tabBarActiveTintColor: secondary,
            tabBarInactiveTintColor: white,
          })}>
          <Tab.Screen name="Products" component={AvailableLoans} />
          <Tab.Screen name="Apply" component={ApplicationForm} />
          <Tab.Screen name="Applications" component={ExistingApplications} />
        </Tab.Navigator>
      </NavigationContainer>
    </ApolloProvider>
  );
}

export default App
