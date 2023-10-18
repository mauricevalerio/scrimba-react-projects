import Badge from './components/badges'
import Banner from './components/banners'
import Card from './components/cards'
import Testimonial from './components/testimonials'
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

      <div className='flex__container flex__wrap'>
        <Badge color='gray' />
        <Badge color='red' />
        <Badge color='yellow' />
        <Badge color='green' />
        <Badge color='blue' />
        <Badge color='indigo' />
        <Badge color='purple' />
        <Badge color='pink' />
      </div>

      <div className='flex__container flex__col'>
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

      <div className='flex__container'>
        <Card icon={<FaAccessibleIcon />} cardBackground='navy' titleColor='pink' contentColor='pink'>
          <Card.Title>Easy Deployment</Card.Title>
          <Card.Content>Ac tincidunt sapien vehicula erat auctor pellentesque rhoncus. Et magna sit morbi lobortis.</Card.Content>
        </Card>

        <Card>
          <Card.Title>Easy Deployment</Card.Title>
          <Card.Content>Ac tincidunt sapien vehicula erat auctor pellentesque rhoncus. Et magna sit morbi lobortis.</Card.Content>
        </Card>

        <Card>
          <Card.Content>Ac tincidunt sapien vehicula erat auctor pellentesque rhoncus. Et magna sit morbi lobortis.</Card.Content>
        </Card>
      </div>

      <div className='flex__container flex__col gap padding'>
        <Testimonial imgSrc='./default-img.jpg'>
          <Testimonial.Content>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed urna nulla vitae laoreet augue. Amet feugiat est integer dolor auctor adipiscing nunc urna, sit. </Testimonial.Content>
          <Testimonial.Name>May Andersons</Testimonial.Name>
          <Testimonial.Role>Workcation, CTO</Testimonial.Role>
        </Testimonial>

        <Testimonial>
          <Testimonial.Content>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed urna nulla vitae laoreet augue. Amet feugiat est integer dolor auctor adipiscing nunc urna, sit. </Testimonial.Content>
          <Testimonial.Name>May Andersons</Testimonial.Name>
        </Testimonial>

        <Testimonial bgColor='pink'>
          <Testimonial.Content>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed urna nulla vitae laoreet augue. Amet feugiat est integer dolor auctor adipiscing nunc urna, sit. </Testimonial.Content>
          <Testimonial.Name>May Andersons</Testimonial.Name>
          <Testimonial.Role>Workcation, CTO</Testimonial.Role>
        </Testimonial>
      </div>
    </div>
  )
}


// no image
// - Default Logo in middle
// - no quote svg
// - name and title format different
// - background different