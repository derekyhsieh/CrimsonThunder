import { Box, Button, Image, Container, HStack, Icon, Square, Stack, Text } from '@chakra-ui/react'
import { FiFileText } from 'react-icons/fi'
import Plot from 'react-plotly.js';
import { useEffect, useState } from 'react';

const createPercentileArray = (lengthData: any, percentileNumber: string) => {

  return lengthData.map((length: any) => length[`percentile_${percentileNumber}_var`])

}

export const StatCard = ({ source, title }: any) => {

  const [xValues, setxValues] = useState([])
  const [percentile3, setPercentile3] = useState([])
  const [percentile10, setPercentile10] = useState([])
  const [percentile25, setPercentile25] = useState([])
  const [percentile50, setPercentile50] = useState([])
  const [percentile75, setPercentile75] = useState([])
  const [percentile90, setPercentile90] = useState([])
  const [percentile97, setPercentile97] = useState([])


  const convertWkJson = () => {

    const lengthData = JSON.parse(JSON.stringify(source))
    const xValues = lengthData.map((length: any) => length.Day)



    setxValues(xValues)
    

    setPercentile3(createPercentileArray(lengthData, "3"))
    setPercentile10(createPercentileArray(lengthData, "10"))
    setPercentile25(createPercentileArray(lengthData, "25"))
    setPercentile50(createPercentileArray(lengthData, "50"))
    setPercentile75(createPercentileArray(lengthData, "75"))
    setPercentile90(createPercentileArray(lengthData, "90"))
    setPercentile97(createPercentileArray(lengthData, "97"))

  }

  useEffect(() => {

    convertWkJson()

  }, [])
  
  return (

  <Box as="section" py={{ base: '4', md: '8' }}>
    <Container maxW={"100%"}>
      <Box bg="bg-surface" boxShadow="sm" borderRadius="lg" p={{ base: '4', md: '6' }}>
        <Stack spacing="5">
          <Stack spacing="1">
            <Text fontSize="lg" fontWeight="medium">
              {title}
            </Text>
            <Text fontSize="sm" color="muted">
            </Text>
          </Stack>

          <Plot
            data={[
              {
                x: xValues,
                y: percentile97,
                type: 'scatter',
                mode: 'lines',
                line: { dash: 'solid' },
                name: '97th Percentile',
              }
              ,
              {
                x: xValues,
                y: percentile90,
                type: 'scatter',
                mode: 'lines',
                line: { dash: 'dash' },
                name: '90th Percentile',
              },
              {
                x: xValues,
                y: percentile75,
                type: 'scatter',
                mode: 'lines',
                line: { dash: 'dot' },
                name: '75th Percentile',
              },
              {
                x: xValues,
                y: percentile50,
                type: 'scatter',
                mode: 'lines',
                line: { dash: 'dot' },
                name: '50th Percentile',
              },
              {
                x: xValues,
                y: percentile25,
                type: 'scatter',
                mode: 'lines',
                line: { dash: 'dot' },
                name: '25th Percentile',
              },
              {
                x: xValues,
                y: percentile10,
                type: 'scatter',
                mode: 'lines',
                line: { dash: 'dot' },
                name: '10th Percentile',
              },
              {
                x: xValues,
                y: percentile3,
                type: 'scatter',
                mode: 'lines',
                line: { dash: 'dot' },
                name: '3rd Percentile',
              },
            ]}
          />
          {/* <Image src={source} /> */}
          {/* <Box borderWidth={{ base: '0', md: '1px' }} p={{ base: '0', md: '4' }} borderRadius="lg"> */}
          {/*   <Stack justify="space-between" direction={{ base: 'column', md: 'row' }} spacing="5"> */}
          {/*     <HStack spacing="3"> */}
          {/*       <Square size="10" bg="bg-subtle" borderRadius="lg"> */}
          {/*         <Icon as={FiFileText} boxSize="5" /> */}
          {/*       </Square> */}
          {/*       <Box fontSize="sm"> */}
          {/*         <Text color="empahsized" fontWeight="medium"> */}
          {/*           Invoice_03/2022.pdf */}
          {/*         </Text> */}
          {/*         <Text color="muted">1.2MB</Text> */}
          {/*       </Box> */}
          {/*     </HStack> */}
          {/*     <Stack spacing="3" direction={{ base: 'column-reverse', md: 'row' }}> */}
          {/*       <Button variant="secondary">Download</Button> */}
          {/*       <Button variant="primary">View</Button> */}
          {/*     </Stack> */}
          {/*   </Stack> */}
          {/* </Box> */}
        </Stack>
      </Box>
    </Container>
  </Box>
  )
}
