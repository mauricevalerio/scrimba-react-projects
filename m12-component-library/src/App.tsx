import Badge from './components/badges'
import Banner from './components/banners'
import Card from './components/cards'
import { FaAccessibleIcon } from 'react-icons/fa'

export default function App() {
  /*
    All props are optional
      text
        - any string
        - default: 'badge'
      shape
        - 'pill' or 'square'
        - default: 'square'
      color
        - gray, red, yellow, green, blue, indigo, purple, pink
        - default: gray

  */
  return (
    <div className='component__library'>
      <div className='badge__container'>
        <Badge color='gray' />
        <Badge color='red' />
        <Badge color='yellow' />
        <Badge color='green' />
        <Badge color='blue' />
        <Badge color='indigo' />
        <Badge color='purple' />
        <Badge color='pink' />
      </div>

      <div className='banner__container'>
        <Banner status={'SUCCESS'}>
          <Banner.Title>Congratulations</Banner.Title>
          <Banner.Content>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid pariatur, ipsum similique veniam.</Banner.Content>
        </Banner>

        <Banner status={'WARNING'}>
          <Banner.Title>Attention</Banner.Title>
          <Banner.Content>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid pariatur, ipsum similique veniam quo totam eius aperiam dolorum.</Banner.Content>
        </Banner>

        <Banner status={'ERROR'}>
          <Banner.Title>There is a problem with your application</Banner.Title>
          <Banner.Content>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid pariatur, ipsum similique veniam quo totam eius aperiam dolorum.</Banner.Content>
        </Banner>

        <Banner status={'INFO'}>
          <Banner.Title>Update available</Banner.Title>
          <Banner.Content>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid pariatur, ipsum similique veniam.</Banner.Content>
        </Banner>
      </div>

      <div className='card__container'>
        <Card icon={<FaAccessibleIcon />} cardBackground='navy' titleColor='pink' contentColor='pink'>
          <Card.Title>Easy Deployment</Card.Title>
          <Card.Content>Ac tincidunt sapien vehicula erat auctor pellentesque rhoncus. Et magna sit morbi lobortis.</Card.Content>
        </Card>

        <Card>
          <Card.Title>Easy Deployment</Card.Title>
          <Card.Content>Ac tincidunt sapien vehicula erat auctor pellentesque rhoncus. Et magna sit morbi lobortis.</Card.Content>
        </Card>
      </div>
    </div>
  )
}
