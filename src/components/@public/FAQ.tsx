import * as React from 'react'
import Accordion from '@mui/material/Accordion'
import AccordionDetails from '@mui/material/AccordionDetails'
import AccordionSummary from '@mui/material/AccordionSummary'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import _ from 'lodash'
import HtmlParser from '@components/HtmlParser'
import { lang } from '@constants/content.constants'
import { useTranslation } from 'react-i18next'

interface FAQProps {
  lang: string
}

const data = {
  en: [
    {
      question: 'How does Kommai work?',
      answer:
        '<p>You log in with Facebook, connect your pages, and input your pre-created responses. Our AI system then selects the most appropriate reply for each comment and responds automatically.</p>',
    },
    {
      question: 'Will this affect the credibility of my Facebook page?',
      answer:
        "<p>No. We strictly adhere to all Facebook rules and regulations and maintain high security standards to protect your page's credibility.</p>",
    },
    {
      question: 'Can I modify my responses?',
      answer:
        '<p>Yes, you can add, edit, or delete your pre-created responses at any time.</p>',
    },
    {
      question: 'How do I pay for my subscription?',
      answer:
        '<p><p>Make your recharges and package purchases using QPay, a simple payment solution</p>',
    },
    {
      question: 'What is the token system in the subscription?',
      answer:
        '<p>Our token system is designed to provide flexibility and value for our users. Each subscription plan comes with a set number of tokens, and each token represents one processed comment reply. This system allows you to have more control over your usage and costs. For example, if you have a plan with 1000 tokens, you can process 1000 comment replies.</p>',
    },
    {
      question: 'What happens if I run out of tokens?',
      answer:
        '<p>If you reach the limit of free tokens provided by your subscription, you have two options:</p><ul><li>Upgrade to a higher tier subscription with more tokens</li><li>Purchase additional tokens to top up your existing plan</li></ul><p>This flexible system ensures that you only pay for what you need, making our service more accessible and cost-effective, especially for small businesses or those just starting out.</p>',
    },
    {
      question: 'Can unused tokens be carried over to the next month?',
      answer:
        '<p>Sorry, but unused tokens from your current billing cycle will not be carried over to the next month. We recommend using all of your allocated tokens within each billing period to maximize value. Please choose a subscription plan that best fits your monthly usage to avoid losing unused tokens.</p>',
    },
    {
      question: 'How can I monitor my token usage?',
      answer:
        "<p>You can easily track your token usage in your Kommai dashboard. We also send notifications when you're approaching your token limit to help you manage your usage effectively.</p>",
    },
  ],

  mn: [
    {
      question: 'Kommai хэрхэн ажилладаг вэ?',
      answer:
        '<p>Та Facebook-ээр нэвтэрч, хуудсаа холбоод, урьдчилан бэлтгэсэн хариултуудаа оруулна. Бидний AI систем сэтгэгдэл бүрт тохирох хариултыг сонгож, автоматаар хариу өгнө.</p>',
    },
    {
      question:
        'Энэ нь миний Facebook хуудасны найдвартай байдалд нөлөөлөх үү?',
      answer:
        '<p>Үгүй. Бид Facebook-ийн бүх дүрэм, журмыг чандлан мөрддөг бөгөөд таны хуудасны найдвартай байдлыг хамгаалахын тулд аюулгүй байдлын өндөр стандартуудыг баримталдаг.</p>',
    },
    {
      question: 'Би хариултуудаа өөрчилж болох уу?',
      answer:
        '<p>Тийм, та хүссэн үедээ урьдчилан бэлтгэсэн хариултуудаа нэмж, засварлах, устгах боломжтой.</p>',
    },
    {
      question: 'Би захиалгын төлбөрөө хэрхэн хийх вэ?',
      answer:
        '<p>Хялбар төлбөрийн шийдэл болох QPay ашиглан цэнэглэлт, багц худалтан авалтаа хийгээрэй</p>',
    },
    {
      question: 'Захиалгын токен систем гэж юу вэ?',
      answer:
        '<p>Бидний токен систем нь хэрэглэгчдэд уян хатан байдал, үнэ цэнийг санал болгохоор зохион бүтээгдсэн. Захиалгын багц бүр тодорхой тооны токентой байх бөгөөд токен бүр нэг боловсруулсан сэтгэгдлийн хариултыг илэрхийлнэ. Энэ систем нь таны хэрэглээ болон зардлыг илүү сайн хянах боломжийг олгодог. Жишээлбэл, хэрэв та 1000 токентой багцтай бол 1000 сэтгэгдлийн хариултыг боловсруулах боломжтой.</p>',
    },
    {
      question: 'Хэрэв миний токен дуусвал яах вэ?',
      answer:
        '<p>Хэрэв та захиалгаар олгогдсон үнэгүй токены хязгаартаа хүрвэл танд хоёр сонголт байна:</p><ul><li>Илүү олон токентой өндөр түвшний захиалга руу шилжих</li><li>Одоогийн багцаа цэнэглэхийн тулд нэмэлт токен худалдан авах</li></ul><p>Энэ уян хатан систем нь таныг зөвхөн хэрэгцээтэй зүйлдээ төлбөр төлөхийг баталгаажуулж, ялангуяа жижиг бизнес эсвэл дөнгөж эхэлж буй хүмүүст бидний үйлчилгээг илүү хүртээмжтэй, зардал багатай болгодог.</p>',
    },
    {
      question: 'Ашиглаагүй токенууд дараа сард шилжих үү?',
      answer:
        '<p>Уучлаарай, таны одоогийн төлбөрийн мөчлөгт ашиглаагүй үлдсэн токенууд дараагийн сард шилжихгүй. Үнэ цэнийг хамгийн өндөр түвшинд хүргэхийн тулд төлбөрийн хугацаа дуусахаас өмнө бүх хуваарилагдсан токеноо ашиглахыг зөвлөж байна. Ашиглаагүй токен алдахгүйн тулд сар бүрийн хэрэглээндээ хамгийн сайн тохирох захиалгын багцийг сонгоно уу.</p>',
    },
    {
      question: 'Би токены хэрэглээгээ хэрхэн хянах вэ?',
      answer:
        '<p>Та Kommai-ийн хянах самбар дээрээс токены хэрэглээгээ амархан хянах боломжтой. Мөн та токены хязгаартаа ойртож байгаа үед бид танд мэдэгдэл илгээж, хэрэглээгээ үр дүнтэй удирдахад тань туслах болно.</p>',
    },
  ],
}

const FAQ: React.FC<FAQProps> = ({ lang }) => {
  const [expanded, setExpanded] = React.useState<string | false>(false)

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false)
    }

  const faqItems = data[lang as lang]

  const { t } = useTranslation()

  return (
    <Container
      id="faq"
      sx={{
        pt: { xs: 4, sm: 12 },
        pb: { xs: 8, sm: 16 },
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: { xs: 3, sm: 6 },
      }}
    >
      <Typography
        component="h2"
        variant="h4"
        sx={{
          color: 'text.primary',
          width: { sm: '100%', md: '60%' },
          textAlign: { sm: 'left', md: 'center' },
        }}
      >
        {t('HOME.faq')}
      </Typography>
      <Box sx={{ width: '100%' }}>
        {_.map(faqItems, (item, index) => (
          <Accordion
            key={index}
            expanded={expanded === `panel${index}`}
            onChange={handleChange(`panel${index}`)}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`panel${index}d-content`}
              id={`panel${index}d-header`}
            >
              <Typography component="h3" variant="subtitle2">
                {item.question}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <HtmlParser content={item.answer} />
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
    </Container>
  )
}

export default FAQ
