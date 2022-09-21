import React, { useState, useEffect } from 'react'
import { GetStaticPropsContext } from 'next'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { dehydrate, QueryClient, useQuery } from 'react-query'

import { getBoardAPI, getReplyAPI } from '@/api/board'

import Header from '@/components/Header'
import BackButton from '@/components/BackButton'
import Profile from '@/components/Profile'
import ContentBottom from '@/components/ContentBottom'
import Reply from '@/components/Reply'
import ContentBar from '@/components/ContentBar'
import ModalAlert from '@/components/ModalAlert'

import * as styles from '@/css/content/contentDetailStyles'

type ImageProps = {
  seq: number
  url: string
}

type ContentProps = {
  title: string
  content: string
  heartCheck: boolean
  heartCount: number
  createdDate: string
  writer: string
  repliseNum: number
  images: ImageProps[]
}

type ReplyProps = {
  content: string
  createdDate: string
  isRoot: boolean
  mine: boolean
  replyParent: number
  seq: number
  updatedDate: null
  writerNickname: string
  writerProfileImage: string
}

const ContentDetail = () => {
  const router = useRouter()
  const { query } = router
  const cid = parseInt(query.id as string)
  const { data: board } = useQuery(['board', cid], () => getBoardAPI(cid))
  const { data: reply } = useQuery(['reply', cid], () => getReplyAPI(cid))
  const [modal, setModal] = useState<boolean>(false)

  useEffect(() => {
    if (!board) {
      setModal(true)
    }
  }, [board, reply])

  return (
    <section key={cid}>
      <Header
        left={<BackButton />}
        right={
          <div css={styles.menu}>
            <Image src="/assets/share.png" width={24} height={24} />
            <Image src="/assets/more.png" width={24} height={24} />
          </div>
        }
      />
      <div css={styles.wrapper}>
        <Profile writer={board.writer} date={board.createdDate} />
        <div css={styles.title}>{board.title}</div>
        <div css={styles.content}>{board.content}</div>
        {board.images?.length !== 0 && (
          <div>
            {board.images?.map((img: ImageProps, index: number) => (
              <div key={img.seq} css={styles.image}>
                <img referrerPolicy="no-referrer" src={img.url} />
              </div>
            ))}
          </div>
        )}
        <ContentBottom
          heartCount={board.heartCount}
          heartCheck={board.heartCheck}
          seq={cid}
          repliesNum={board.repliesNum}
        />
        {reply.data.content?.length !== 0 && (
          <div css={styles.reply}>
            {reply.data.content?.map((item: ReplyProps, index: number) => {
              if (item.isRoot) {
                return (
                  <>
                    <Reply key={item.seq} data={item} />
                  </>
                )
              }
            })}
          </div>
        )}
      </div>
      <ContentBar boardSeq={cid} />
      <ModalAlert
        title="존재하지 않는 게시물입니다."
        isOpen={modal}
        onClick={() => {
          setModal(!modal)
          router.back()
        }}
      />
    </section>
  )
}

export const getStaticPaths = async () => {
  return {
    paths: [],
    fallback: true,
  }
}

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const queryClient = new QueryClient()
  const id = context.params?.id as string
  if (!id) {
    return {
      redirect: {
        destination: '/',
        permanet: true,
      },
    }
  }
  await Promise.allSettled([
    queryClient.prefetchQuery(['board', Number(id)], () =>
      getBoardAPI(Number(id)),
    ),
    queryClient.prefetchQuery(['comment', Number(id)], () =>
      getReplyAPI(Number(id)),
    ),
  ])
  return {
    props: {
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
    },
  }
}

export default React.memo(ContentDetail)
