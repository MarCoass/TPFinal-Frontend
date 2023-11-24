import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
    AlertDialogAction,
} from '@/components/ui/alert-dialog'
import axios from '@/lib/axios'

import { PlusSquare } from 'lucide-react'
import { useState } from 'react'
const { default: getCookie } = require('@/lib/cookies')

import { Input } from '@/components/ui/input'

