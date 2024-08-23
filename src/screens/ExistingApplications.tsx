import React from 'react'
import { useQuery } from '@apollo/client'
import { GET_LOAN_APPLICATIONS } from '../services/graphQL/queries'
import { ActivityIndicator, FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import { background, primary } from '../constants/colours'
import { large, medium, small } from '../constants/dimensions'
import { heading, highlight, normal, subtitle } from '../constants/styles'

const Screen = () => {
    const { loading, error, data } = useQuery(GET_LOAN_APPLICATIONS);

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
                data={data.loanApplications}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.loanItems}>
                        <Text style={heading}>{item.fullName}</Text>
                        <Text style={[normal, { marginBottom: small }]}>{item.email}</Text>
                        <Text style={subtitle}>Amount:</Text>
                        <Text style={[highlight, { marginBottom: small }]}>{item.loanAmount} UGX</Text>
                        <Text style={subtitle}>Purpose:</Text>
                        <Text style={normal}>{item.loanPurpose}</Text>
                    </View>
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