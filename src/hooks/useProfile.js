import { useState, useEffect } from 'react'
import { DEFAULT_PROFILE } from '../constants/topics'

const STORAGE_KEY = 'devboard_profile'

function loadProfile() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (!stored) return null
    return JSON.parse(stored)
  } catch {
    return null
  }
}

function saveProfile(profile) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(profile))
  } catch {
    console.warn('Could not save profile to localStorage')
  }
}

export function useProfile() {

  const [profile, setProfile] = useState(() => {
    const stored = loadProfile()
    return stored ?? DEFAULT_PROFILE
  })

  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(() => {
    return localStorage.getItem('devboard_onboarded') === 'true'
  })

  useEffect(() => {
    saveProfile(profile)
  }, [profile]) 

  function completeOnboarding(initialProfile) {
    setProfile(initialProfile)
    setHasCompletedOnboarding(true)
    localStorage.setItem('devboard_onboarded', 'true')
  }

  function toggleLanguage(id) {
    setProfile(prev => ({
      ...prev,
      languages: prev.languages.includes(id)
        ? prev.languages.filter(l => l !== id)
        : [...prev.languages, id]
    }))
  }

  function toggleTopic(id) {
    setProfile(prev => ({
      ...prev,
      topics: prev.topics.includes(id)
        ? prev.topics.filter(t => t !== id)
        : [...prev.topics, id]
    }))
  }

  function addPackage(pkg) {
    const cleaned = pkg.trim().toLowerCase()
    if (!cleaned || profile.packages.includes(cleaned)) return
    setProfile(prev => ({
      ...prev,
      packages: [...prev.packages, cleaned]
    }))
  }

  function removePackage(pkg) {
    setProfile(prev => ({
      ...prev,
      packages: prev.packages.filter(p => p !== pkg)
    }))
  }

  function addClock(id) {
    if (profile.clocks.includes(id)) return
    setProfile(prev => ({ ...prev, clocks: [...prev.clocks, id] }))
  }

  function removeClock(id) {
    setProfile(prev => ({
      ...prev,
      clocks: prev.clocks.filter(c => c !== id)
    }))
  }

  function toggleBookmark(item) {
    setProfile(prev => {
      const exists = prev.bookmarks.some(b => b.id === item.id)
      return {
        ...prev,
        bookmarks: exists
          ? prev.bookmarks.filter(b => b.id !== item.id)
          : [...prev.bookmarks, item]
      }
    })
  }

  return {
    profile,
    hasCompletedOnboarding,
    completeOnboarding,
    toggleLanguage,
    toggleTopic,
    addPackage,
    removePackage,
    addClock,
    removeClock,
    toggleBookmark,
  }
}