'use client'
import { Tables } from '@/types_db'
import { splitName } from '@/utils/helpers'
import { getUserGeoLocation, handleBasicSearch } from '@/utils/https'
import { useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

type Profile = Tables<'profiles'>

export default function useResult(profile?: Profile | null) {
    const searchParams = useSearchParams()
    const [isLoading, setIsLoading] = useState(true)
    const name = searchParams.get('name')
    const [googleResultData, setGoogleResultData] = useState([])
    const [brokerResultData, setBrokerResultData] = useState([])
    const [userInfo, setUserInfo] = useState<any>()

    useEffect(() => {
        if (name || profile) {
            getUserInfo()
        }
    }, [])

    useEffect(() => {
        if (userInfo?.location || profile) {
            handleGoogleSearch()
            // handleBrokerSearch()
        }
    }, [userInfo])

    const getUserInfo = async () => {
        const { first_name, last_name } = splitName(name ?? '')
        if (profile) {

            setUserInfo({
                ...profile,
                location: profile.address
            })
        } else {
            const location = await getUserGeoLocation()
            setUserInfo({ ...location, first_name, last_name })
        }
    }

    const handleGoogleSearch = async () => {
        try {
            const { first_name, last_name, location } = userInfo;
            const result = await handleBasicSearch({
                first_name,
                last_name,
                location
            })
            setGoogleResultData(
                result?.map((d: any) => ({
                    name: d.title,
                    url: d.urdisplayLinkl,
                    subUrl: d.url,
                    date: d.snippet
                }))
            )
            setIsLoading(false)
        } catch (err) {
            console.log(err)
            setIsLoading(false)
        }
    }

    const handleBrokerSearch = async () => {
        try {
            const { first_name, last_name, location } = userInfo;
            const result = await handleBasicSearch({
                type: 'broker',
                first_name,
                last_name,
                location,
            })
            setBrokerResultData(
                result?.map((d: any) => ({
                    name: d.title,
                    url: d.urdisplayLinkl,
                    subUrl: d.url,
                    date: d.snippet
                }))
            )
            setIsLoading(false)
        } catch (err) {
            console.log(err)
            setIsLoading(false)
        }
    }

    return {
        userInfo,
        isLoading,
        googleResultData,
        brokerResultData,
    }

}
