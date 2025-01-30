import { promises as fs } from 'fs'
import path from 'path'
import { type Opinion, type User } from '@prisma/client'
import fg from 'fast-glob'
import Handlebars from 'handlebars'
import _ from 'lodash'
import { env } from './env'

const getHbrTemplates = _.memoize(async () => {
  const htmlPathsPattern = path.resolve(__dirname, '../emails/dist/**/*.html')
  const htmlPaths = fg.sync(htmlPathsPattern)
  const hbrTemplates: Record<string, HandlebarsTemplateDelegate> = {}
  for (const htmlPath of htmlPaths) {
    const templateName = path.basename(htmlPath, '.html')
    const htmlTemplate = await fs.readFile(htmlPath, 'utf8')
    hbrTemplates[templateName] = Handlebars.compile(htmlTemplate)
  }
  return hbrTemplates
})

const getEmailHtml = async (templateName: string, templateVariables: Record<string, string> = {}) => {
  const hbrTemplates = await getHbrTemplates()
  const hbrTemplate = hbrTemplates[templateName]
  const html = hbrTemplate(templateVariables)
  return html
}

const sendEmail = async ({
  to,
  subject,
  templateName,
  templateVariables = {},
}: {
  to: string
  subject: string
  templateName: string
  templateVariables?: Record<string, any>
}) => {
  try {
    const fullTemplateVaraibles = {
      ...templateVariables,
      homeUrl: env.WEBAPP_URL,
    }
    const html = await getEmailHtml(templateName, fullTemplateVaraibles)
    console.info('sendEmail', {
      to,
      subject,
      templateName,
      html,
    })
    return { ok: true }
  } catch (error) {
    console.error(error)
    return { ok: false }
  }
}

export const sendWelcomeEmail = async ({ user }: { user: Pick<User, 'nick' | 'email'> }) => {
  return await sendEmail({
    to: user.email,
    subject: 'thanks for registration!',
    templateName: 'welcome',
    templateVariables: {
      userNick: user.nick,
      addOpinionUrl: `${env.WEBAPP_URL}/opinions/new`,
    },
  })
}

export const sendOpinionBlockedEmail = async ({
  user,
  opinion,
}: {
  user: Pick<User, 'email'>
  opinion: Pick<Opinion, 'nick'>
}) => {
  return await sendEmail({
    to: user.email,
    subject: 'your opinion blocked!',
    templateName: 'opinionBlocked',
    templateVariables: {
      opinionNick: opinion.nick,
    },
  })
}
