import React, { useState, useCallback } from 'react'
import { useMutation, useQueryClient } from 'react-query'
import Image from 'next/image'
import { AxiosError } from 'axios'
import { useRecoilState } from 'recoil'
import * as R from 'ramda'

import { deleteReplyAPI } from '@/api/board'
import { DataProps, ReplyStateProps } from '@/interfaces/board'
import { replyState } from '@/recoil'

import Button from '@/components/Button'
import ModalAlert from '@/components/ModalAlert'
import ModalDropDown from '@/components/ModalDropDown'
import ModalReply from '@/components/ModalReply'

import * as styles from './styles'

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

type Props = {
  data?: ReplyProps
  reReply?: any
  boardSeq?: number
}

const Reply = ({ data, reReply, boardSeq }: Props) => {
  const query = useQueryClient()

  const [, setState] = useRecoilState<ReplyStateProps>(replyState)

  const [menu, setMenu] = useState<boolean>(false)
  const [modal, setModal] = useState<boolean>(false)
  const [title, setTitle] = useState<string>('')

  const [replyModal, setReplyModal] = useState<boolean>(false)

  const {
    content = '',
    createdDate,
    isRoot,
    mine,
    replyParent = 1,
    seq = 1,
    writerNickname = '',
    writerProfileImage,
  } = data || {}

  const deleteMutation = useMutation<DataProps, AxiosError, number>(
    deleteReplyAPI,
    {
      onSuccess: (response) => {
        if (response) {
          setModal(true)
          if (response.success) {
            setTitle(response.message)
          } else {
            setTitle(response.data.message)
          }
        }
      },
    },
  )

  const handleMenu = useCallback(() => {
    setMenu(!menu)
  }, [menu])

  const handleModal = useCallback(() => {
    setModal(!modal)
  }, [modal])

  const handleReReply = useCallback(() => {
    setState({
      type: 'reReply',
      content: content,
      seq: seq,
      replyParent: replyParent,
      writer: writerNickname,
    })
    setReplyModal(true)
  }, [content, replyParent, seq, setState, writerNickname])

  const handleEdit = useCallback(() => {
    handleMenu()
    setState({
      type: 'edit',
      content: content,
      seq: seq,
      replyParent: replyParent,
      writer: writerNickname,
    })
    setReplyModal(true)
  }, [content, handleMenu, replyParent, seq, setState, writerNickname])

  const handleDelete = useCallback(() => {
    handleMenu()
    deleteMutation.mutate(seq)
  }, [deleteMutation, handleMenu, seq])

  const handleCloseReplyModal = useCallback(() => {
    query.invalidateQueries(['reply', boardSeq])
    setReplyModal(!replyModal)
    setState({
      type: 'add',
      content: '',
      seq: 1,
      replyParent: 1,
      writer: '',
    })
  }, [boardSeq, query, replyModal, setState])

  return (
    <>
      <div css={styles.container}>
        <div css={styles.innerContainer}>
          <div css={styles.image}>
            <img referrerPolicy="no-referrer" src={writerProfileImage} />
          </div>
          <div>
            <div>
              <span css={styles.name}>{writerNickname}</span>
              <span css={styles.date}>{createdDate}</span>
            </div>
            <div css={styles.reply}>{content}</div>
          </div>
          {mine && (
            <div css={styles.menu} onClick={handleMenu}>
              <Image src="/assets/more.png" width={24} height={24} />
            </div>
          )}
        </div>
        {isRoot && (
          <div css={styles.replyButton}>
            <Button style="secondary" size="xs" onClick={handleReReply}>
              답글 달기
            </Button>
          </div>
        )}
        {!R.isEmpty(reReply) && (
          <div css={styles.reReplyBlock}>
            {reReply?.map((item: any) => (
              <Reply key={item.seq} data={item} boardSeq={boardSeq} />
            ))}
          </div>
        )}
        <ModalDropDown
          isOpen={menu}
          title="댓글"
          onClick={handleMenu}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />
        <ModalAlert title={title} isOpen={modal} onClick={handleModal} />
      </div>
      <ModalReply
        boardSeq={boardSeq}
        isOpen={replyModal}
        onClick={handleCloseReplyModal}
      />
    </>
  )
}

export default React.memo(Reply)
