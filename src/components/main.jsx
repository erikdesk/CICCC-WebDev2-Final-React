import React, { Component } from 'react'
import Header from './header'
import Preferences from './preferences'
import Yelp from './find'
import Map from './map'

class Main extends Component {
  state = {
    status: 0,
    preferences: {
      price: { value: 1, valueMin: 0, valueMax: 3 },
      proximity: {
        value: 2,
        valueMin: 0,
        valueMax: 4,
        meterStep: 300,
      },
      isLocked: false,
    },
    directions: {
      show: false,
      start: { lat: null, lng: null },
      end: { address: null },
    },
    place: null,
  }

  constructor() {
    super()
    console.log('Const....')
  }

  componentDidMount() {
    console.log('Mount....')
  }

  handlePriceIncrement = (e) => {
    const preferences = JSON.parse(JSON.stringify(this.state.preferences))
    e.value++
    preferences.price = e
    this.setState({ preferences })
  }

  handlePriceDecrement = (e) => {
    const preferences = JSON.parse(JSON.stringify(this.state.preferences))
    e.value--
    preferences.price = e
    this.setState({ preferences })
  }

  handleProximityIncrement = (e) => {
    const preferences = JSON.parse(JSON.stringify(this.state.preferences))
    e.value++
    preferences.proximity = e
    this.setState({ preferences })
  }

  handleProximityDecrement = (e) => {
    const preferences = JSON.parse(JSON.stringify(this.state.preferences))
    e.value--
    preferences.proximity = e
    this.setState({ preferences })
  }

  handleFindRestaurant = async () => {
    const getBrowserLocation = () =>
      new Promise((resolve, reject) =>
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          timeout: 10000,
        })
      )
    const wait = async (ms) =>
      new Promise((resolve) => {
        setTimeout(resolve, ms)
      })

    try {
      const corsAccess = 'https://cors.bridged.cc/'
      const endpoint = `${corsAccess}https://api.yelp.com/v3/businesses/`
      const yelpApiKey =
        'XChYHgRMtE0N7P8rUaCWyRuc4dqctFWLnD_gCEYbtjMAB3MP2Nas8IpOmT2KJf6N6YLTH4oLKBFh6M7DqOfhpAAB9BviOry2J3b3IQO5GqKswk6PhumkwI9YAJtTYHYx'

      const price = this.state.preferences.price.value + 1
      const radius =
        this.state.preferences.proximity.meterStep *
        (this.state.preferences.proximity.value + 1)

      this.setState({ status: 1 })
      await wait(3000)
      const start = await getBrowserLocation()

      this.setState({ status: 2 })
      await wait(3000)
      const paramsSearch = `search?categories=restaurants&latitude=${start.coords.latitude}&longitude=${start.coords.longitude}&radius=${radius}&price=${price}&limit=50&open_now=true&sort_by=review_count`
      const resSearch = await fetch(endpoint + paramsSearch, {
        headers: {
          Authorization: `Bearer ${yelpApiKey}`,
        },
      })
      const yelps = await resSearch.json()
      let places = yelps.businesses
        .map((yelp) => {
          return {
            id: yelp.id,
            rating: yelp.rating,
            review_count: yelp.review_count,
            score: yelp.rating * (yelp.review_count / 1000),
          }
        })
        .sort((a, b) => {
          return b.score - a.score
        })
      places = places.filter((place) => {
        return localStorage.getItem(place.id) === null
      })
      console.log('Results: ', places.length)

      const paramsDetail = places[0].id
      const resDetail = await fetch(endpoint + paramsDetail, {
        headers: {
          Authorization: `Bearer ${yelpApiKey}`,
        },
      })
      const place = await resDetail.json()
      const directions = {
        show: true,
        start: { lat: start.coords.latitude, lng: start.coords.longitude },
        end: {
          address:
            place.name.replace('&', 'and').replace('?', ' ') +
            place.location.display_address.reduce((t, v) => {
              return `${t}, ${v.replace('&', 'and').replace('?', ' ')}`
            }, ''),
        },
      }
      this.setState({ directions })
      this.setState({ place: place.name })
      this.setState({ status: 3 })
      await wait(3000)
      localStorage.setItem(
        place.id,
        `${new Date().toLocaleDateString()} @ ${place.name}`
      )
    } catch {
      console.log(`🔥 Something went wrong!`)
    }
  }

  render() {
    return (
      <div id="viewport">
        <Header />
        <main>
          <hr />
          <Preferences
            preferences={this.state.preferences}
            onPriceIncrement={this.handlePriceIncrement}
            onPriceDecrement={this.handlePriceDecrement}
            onProximityIncrement={this.handleProximityIncrement}
            onProximityDecrement={this.handleProximityDecrement}
          />
          <hr />
          <Yelp
            status={this.state.status}
            place={this.state.place}
            onFindRestaurant={this.handleFindRestaurant}
          />
          <Map directions={this.state.directions} />
        </main>
      </div>
    )
  }
}

export default Main
