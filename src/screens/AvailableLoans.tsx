import React from 'react'
import { useQuery } from '@apollo/client'
import { GET_LOAN_PRODUCTS } from '../services/graphQL/queries'
import { ActivityIndicator, FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { background, primary } from '../constants/colours'
import { large, medium, small } from '../constants/dimensions'
import { button, buttonContainer, heading, highlight, subtitle } from '../constants/styles'
import { useNavigation } from '@react-navigation/native'

const Screen = () => {
    const { loading, error, data } = useQuery(GET_LOAN_PRODUCTS)
    const navigation = useNavigation()

    if (loading) {
        return (
            <View >
                <ActivityIndicator size="large" color={primary} />
                <Text style={{ textAlign: 'center' }}>Loading...</Text>
            </View >
        )
    }
    if (error) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color={primary} style={{ padding: 50 }} />
                <Text style={{ textAlign: 'center' }}>Error: {error.message}</Text>
            </View >
        )
    }

    return (
        <SafeAreaView style={styles.main}>
            <FlatList
                style={styles.list}
                data={data.loanProducts}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.loanItems}
                        onPress={() => { navigation.navigate('Apply') }}
                    >
                        <View>
                            <Text style={[heading, { marginBottom: small }]}>{item.name}</Text>
                            <Text style={subtitle}>Maximum Amount:</Text>
                            <Text style={[highlight, { marginBottom: small }]}>{item.maximumAmount} UGX</Text>
                            <Text style={subtitle}>Interest Rate: {item.interestRate}%</Text>
                        </View>
                        <View style={buttonContainer}>
                            <Text style={button}>Apply Now</Text>
                        </View>
                    </TouchableOpacity>
                )}
            />

        </SafeAreaView>
    )
}

export default Screen

const styles = StyleSheet.create({
    list: {
        paddingTop: small
    },
    loanItems: {
        borderRadius: large,
        padding: medium,
        backgroundColor: "#ffffff",
        marginHorizontal: small,
        marginBottom: small,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    main: {
        backgroundColor: background,
        flex: 1
    },
    container: {
        paddingHorizontal: large,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
})