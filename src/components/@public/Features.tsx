import * as React from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import { useTranslation } from 'react-i18next'
import SendIcon from '@mui/icons-material/Send'
import ShieldIcon from '@mui/icons-material/Shield'
import { Comment } from '@mui/icons-material'

interface FeatureItem {
  id: number
  title: string
  desc: string
  icon: React.ReactNode
}

const featuresContent: Record<string, FeatureItem[]> = {
  en: [
    {
      id: 1,
      title: 'Smart Comment Replies',
      desc: "<p>Our AI understands comments and picks the best pre-made response. It's like having a clever assistant who always knows what to say!</p>",
      icon: <Comment />,
    },
    {
      id: 2,
      title: 'Messenger Integration',
      desc: "<p>We reply to comments and send the same helpful responses directly to the user's Facebook Messenger.</p>",
      icon: <SendIcon />,
    },
    {
      id: 3,
      title: 'Comment Guardian',
      desc: '<p>Keep your page positive! Our smart filter quickly detects and handles negative comments after they\'re posted. You decide what counts as "bad" - from simple swear words to false claims about your business.</p>',
      icon: <ShieldIcon />,
    },
  ],
  mn: [
    {
      id: 1,
      title: 'Ухаалаг хариулт',
      desc: '<p>Манай хиймэл оюун ухаан сэтгэгдлийг ойлгоод, хамгийн тохиромжтой хариултыг сонгоно. Яг л юу хэлэхээ мэддэг ухаалаг туслах шиг!</p>',
      icon: <Comment />,
    },
    {
      id: 2,
      title: 'Мессенжер холболт',
      desc: '<p>Бид сэтгэгдэлд хариулаад зогсохгүй, мөн адил хариуг шууд хэрэглэгчийн Фэйсбүүк мессенжер рүү илгээнэ.</p>',
      icon: <SendIcon />,
    },
    {
      id: 3,
      title: 'Сэтгэгдэл хамгаалагч',
      desc: '<p>Таны хуудсыг эерэг байлгана! Манай ухаалаг шүүлтүүр сөрөг сэтгэгдлийг нийтэлсний дараа шууд илрүүлж, арга хэмжээ авна. Та "муу" гэдгийг юу гэж үзэхээ өөрөө тогтооно - энгийн хараалын үгнээс эхлээд таны бизнесийн талаарх худал мэдээлэл хүртэл.</p>',
      icon: <ShieldIcon />,
    },
  ],
}

export default function Features() {
  const { t, i18n } = useTranslation()

  const items = featuresContent[i18n.language] || featuresContent['en']

  return (
    <Container id="features" sx={{ py: { xs: 8, sm: 16 } }}>
      <Box sx={{ width: { sm: '100%', md: '60%' } }}>
        <Typography
          component="h2"
          variant="h4"
          gutterBottom
          sx={{ color: 'text.primary' }}
        >
          {t('HOME.features')}
        </Typography>
        <Typography
          variant="body1"
          sx={{ color: 'text.secondary', mb: { xs: 2, sm: 4 } }}
        >
          {t('HOME.features_desc')}
        </Typography>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row-reverse' },
          gap: 2,
        }}
      >
        <div>
          <Box
            sx={{
              display: { xs: 'none', sm: 'flex' },
              flexDirection: 'column',
              gap: 2,
              height: '100%',
            }}
          >
            {items.map(({ icon, title, desc }, index) => (
              <Box
                key={index}
                component={Button}
                sx={[
                  (theme) => ({
                    p: 2,
                    height: '100%',
                    width: '100%',
                    '&:hover': {
                      backgroundColor: theme.palette.action.hover,
                    },
                  }),
                ]}
              >
                <Box
                  sx={[
                    {
                      width: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'left',
                      gap: 1,
                      textAlign: 'left',
                      textTransform: 'none',
                      color: 'text.secondary',
                    },
                  ]}
                >
                  {icon}
                  <Typography variant="h6">{title}</Typography>
                  <Typography
                    variant="body2"
                    dangerouslySetInnerHTML={{ __html: desc }}
                  />
                </Box>
              </Box>
            ))}
          </Box>
        </div>
      </Box>
    </Container>
  )
}
